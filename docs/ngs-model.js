// <ngs-model> — live GLB viewer for the NGS-360-3 motion base.
// Attributes: src, roll, pitch, yaw (degrees), autorotate.
// The GLB carries nested gimbal nodes (Pitch > Yaw > Roll); each attribute
// spins its node about its own local axis, so the rings behave like hardware.
const THREE_URL = 'https://esm.sh/three@0.184.0';
const [THREE, { GLTFLoader }, { OrbitControls }, { RoomEnvironment }, { DRACOLoader }] = await Promise.all([
  import(THREE_URL),
  import('https://esm.sh/three@0.184.0/examples/jsm/loaders/GLTFLoader.js'),
  import('https://esm.sh/three@0.184.0/examples/jsm/controls/OrbitControls.js'),
  import('https://esm.sh/three@0.184.0/examples/jsm/environments/RoomEnvironment.js'),
  import('https://esm.sh/three@0.184.0/examples/jsm/loaders/DRACOLoader.js')
]);

// Local gimbal axes: the model is authored Y-forward, so pitch turns about
// its node's X and the gondola rolls about its own X. Yaw turns about Z in its
// parent's frame — its baked 180° rotation swaps local X and Z, so a local-axis
// spin there reads as pitch.
const AXIS = { pitch: 'x', yaw: 'z', roll: 'x' };
const SPACE = { pitch: 'local', yaw: 'parent', roll: 'local' };
THREE.Cache.enabled = true;

// One fetch + one Draco decode per URL, however many viewers are on the page.
const loads = new Map();
function loadOnce(url) {
  if (!loads.has(url)) {
    const draco = new DRACOLoader().setDecoderPath('https://unpkg.com/three@0.184.0/examples/jsm/libs/draco/');
    const loader = new GLTFLoader().setDRACOLoader(draco);
    loads.set(url, new Promise((resolve, reject) => loader.load(url, resolve, undefined, reject)));
  }
  return loads.get(url);
}
const DEG = Math.PI / 180;

class NgsModel extends HTMLElement {
  static get observedAttributes() { return ['src', 'roll', 'pitch', 'yaw', 'autorotate', 'finish']; }

  connectedCallback() {
    if (this.renderer) return;
    this.style.display = 'block';
    this.style.position = 'relative';

    const w = this.clientWidth || 600, h = this.clientHeight || 420;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    const c = this.renderer.domElement;
    c.style.width = '100%'; c.style.height = '100%'; c.style.display = 'block';
    c.style.cursor = 'grab';
    this.appendChild(c);

    this.scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
    this.scene.environmentIntensity = 0.7;

    this.camera = new THREE.PerspectiveCamera(35, w / h, 0.05, 200);
    this.camera.position.set(6, 3.4, 8);

    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(5, 8, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.0008;
    const d = 6;
    Object.assign(key.shadow.camera, { left: -d, right: d, top: d, bottom: -d, near: 0.5, far: 40 });
    this.scene.add(key);
    this.scene.add(new THREE.DirectionalLight(0xdce6f0, 0.5).translateX(-7).translateY(4).translateZ(-5));
    this.scene.add(new THREE.HemisphereLight(0xffffff, 0x9aa3ab, 0.5));

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    this.controls = new OrbitControls(this.camera, c);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 22;
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.addEventListener('start', () => { this.userMoved = true; });

    this.ro = new ResizeObserver(() => {
      // Defer out of the observer callback: resizing the canvas inside it
      // retriggers the observer.
      cancelAnimationFrame(this.resizeRaf);
      this.resizeRaf = requestAnimationFrame(() => this.resize());
    });
    this.ro.observe(this);

    this.load(this.getAttribute('src') || 'assets/NGS-360-3-B.glb');

    this.renderer.setAnimationLoop(() => this.tick());
  }

  disconnectedCallback() {
    this.renderer && this.renderer.setAnimationLoop(null);
    this.ro && this.ro.disconnect();
  }

  load(url) {
    loadOnce(url).then((gltf) => {
      // Clone per viewer so each can pose its own gimbals; materials stay
      // shared, so a finish change paints every viewer at once.
      const root = gltf.scene.clone(true);
      root.traverse((o) => {
        if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
      });
      this.joints = {};
      for (const name of ['Pitch', 'Yaw', 'Roll']) {
        const node = root.getObjectByName(name);
        if (node) this.joints[name.toLowerCase()] = { node, base: node.quaternion.clone() };
      }
      // "Black" is the product's base structure material — the one the finish
      // selector repaints. It is shared across the base, rings and gondola.
      this.finishMaterials = [];
      root.traverse((o) => {
        const mats = o.isMesh ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
        for (const m of mats) {
          if (m && m.name === 'Black' && !this.finishMaterials.some(f => f.material === m)) {
            this.finishMaterials.push({ material: m, base: m.color.clone() });
          }
        }
      });
      const box = new THREE.Box3().setFromObject(root);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      root.position.sub(new THREE.Vector3(center.x, box.min.y, center.z));
      this.scene.add(root);
      this.model = root;

      const radius = Math.max(size.x, size.y, size.z);
      this.bounds = { radius: box.getBoundingSphere(new THREE.Sphere()).radius, height: size.y };
      this.worldBox = new THREE.Box3().setFromObject(root);
      this.controls.minDistance = radius * 0.6;
      this.controls.maxDistance = radius * 6;
      this.fit();
      this.apply();
      this.draw();
      this.dispatchEvent(new CustomEvent('model-ready'));
    }).catch((err) => console.error('GLB load failed', err && (err.message || err.type), url));
  }

  attributeChangedCallback() {
    // Roll / pitch / yaw arrive as three separate attribute writes per update.
    // Applying each one on its own renders intermediate poses and makes the
    // gimbals judder, so coalesce them into the next frame.
    this.dirty = true;
    if (this.coalesce) return;
    this.coalesce = requestAnimationFrame(() => { this.coalesce = null; this.flush(); });
    queueMicrotask(() => { if (document.hidden) this.flush(); });
  }

  flush() {
    if (!this.dirty) return;
    this.dirty = false;
    this.apply();
    this.draw();
  }

  draw() {
    // Paint one frame immediately: the rAF loop is throttled while the page is
    // hidden, and image capture needs a frame in the buffer.
    if (this.renderer && this.model) this.renderer.render(this.scene, this.camera);
  }

  apply() {
    this.paint();
    if (!this.joints) return;
    const q = new THREE.Quaternion();
    for (const key of ['pitch', 'yaw', 'roll']) {
      const j = this.joints[key];
      if (!j) continue;
      const deg = parseFloat(this.getAttribute(key) || '0') || 0;
      const axis = new THREE.Vector3(AXIS[key] === 'x' ? 1 : 0, AXIS[key] === 'y' ? 1 : 0, AXIS[key] === 'z' ? 1 : 0);
      q.setFromAxisAngle(axis, deg * DEG);
      if (SPACE[key] === 'parent') j.node.quaternion.copy(q).multiply(j.base);
      else j.node.quaternion.copy(j.base).multiply(q);
    }
  }

  paint() {
    if (!this.finishMaterials) return;
    const hex = (this.getAttribute('finish') || '').trim();
    for (const f of this.finishMaterials) {
      if (hex) f.material.color.set(hex);
      else f.material.color.copy(f.base);
    }
  }

  // Distance at which the whole bounding sphere fits the frame, vertically and
  // horizontally — the horizontal term is what a narrow frame needs.
  fit() {
    if (!this.bounds) return;
    const { radius, height } = this.bounds;
    const vFov = this.camera.fov * DEG;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * this.camera.aspect);
    const dist = Math.max(radius / Math.sin(vFov / 2), radius / Math.sin(hFov / 2)) * 1.04;
    this.controls.target.set(0, height * 0.5, 0);
    const dir = new THREE.Vector3(0.66, 0.42, 0.72).normalize();
    this.camera.position.copy(this.controls.target).add(dir.clone().multiplyScalar(dist));
    this.controls.update();
    // The sphere fit is conservative for a wide, low object: tighten it against
    // the real bounding-box corners so the frame is actually filled.
    let d = dist;
    for (let i = 0; i < 3 && this.worldBox; i++) {
      this.camera.updateMatrixWorld();
      this.camera.updateProjectionMatrix();
      let extent = 0;
      const p = new THREE.Vector3();
      for (let c = 0; c < 8; c++) {
        p.set(c & 1 ? this.worldBox.max.x : this.worldBox.min.x,
              c & 2 ? this.worldBox.max.y : this.worldBox.min.y,
              c & 4 ? this.worldBox.max.z : this.worldBox.min.z).project(this.camera);
        extent = Math.max(extent, Math.abs(p.x), Math.abs(p.y));
      }
      if (Math.abs(extent - 0.94) < 0.02) break;
      d *= extent / 0.94;
      this.camera.position.copy(this.controls.target).add(dir.clone().multiplyScalar(d));
      this.controls.update();
    }
    this.draw();
  }

  resize() {
    const w = this.clientWidth, h = this.clientHeight;
    if (!w || !h || (w === this.lastW && h === this.lastH)) return;
    this.lastW = w; this.lastH = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.userMoved) this.draw();
    else this.fit();
  }

  tick() {
    this.flush();
    if (this.hasAttribute('autorotate') && this.getAttribute('autorotate') !== 'false') {
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.6;
    } else {
      this.controls.autoRotate = false;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}

if (!customElements.get('ngs-model')) customElements.define('ngs-model', NgsModel);
