/* Live GLB viewer for the NGS-360-3 motion base.
 *
 * A direct port of the prototype's <ngs-model> custom element (ngs-model.js)
 * to a plain class the React wrapper drives. Behaviour is unchanged; the only
 * differences are that three.js is a bundled dependency instead of an ESM CDN
 * import, poses arrive as method calls instead of attribute writes, and
 * dispose() now tears the WebGL context down (the custom element was never
 * unmounted, a React view switch is).
 *
 * The GLB carries nested gimbal nodes (Pitch > Yaw > Roll); each pose value
 * spins its node about its own local axis, so the rings behave like hardware.
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Local gimbal axes: the model is authored Y-forward, so pitch turns about
// its node's X and the gondola rolls about its own X. Yaw turns about Z in its
// parent's frame — its baked 180° rotation swaps local X and Z, so a local-axis
// spin there reads as pitch.
const AXIS = { pitch: 'x', yaw: 'z', roll: 'x' } as const;
const SPACE = { pitch: 'local', yaw: 'parent', roll: 'local' } as const;
const JOINTS = ['pitch', 'yaw', 'roll'] as const;

export type JointName = (typeof JOINTS)[number];
export type Pose = Record<JointName, number>;

const DEG = Math.PI / 180;

THREE.Cache.enabled = true;

// One fetch + one Draco decode per URL, however many viewers are on the page.
const loads = new Map<string, Promise<GLTF>>();

function loadOnce(url: string): Promise<GLTF> {
  let pending = loads.get(url);
  if (!pending) {
    const draco = new DRACOLoader().setDecoderPath(`${import.meta.env.BASE_URL}draco/`);
    const loader = new GLTFLoader().setDRACOLoader(draco);
    pending = new Promise<GLTF>((resolve, reject) => loader.load(url, resolve, undefined, reject));
    loads.set(url, pending);
  }
  return pending;
}

interface Joint {
  node: THREE.Object3D;
  base: THREE.Quaternion;
}

interface FinishMaterial {
  material: THREE.MeshStandardMaterial;
  base: THREE.Color;
}

export interface NgsViewerOptions {
  onReady?: () => void;
  onError?: (error: unknown) => void;
}

export class NgsViewer {
  private host: HTMLElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private controls: OrbitControls;
  private pmrem: THREE.PMREMGenerator;
  private environment: THREE.Texture;
  private ro: ResizeObserver;
  private resizeRaf = 0;
  private coalesce = 0;

  private model: THREE.Object3D | null = null;
  private joints: Partial<Record<JointName, Joint>> = {};
  private finishMaterials: FinishMaterial[] = [];
  private bounds: { radius: number; height: number } | null = null;
  private worldBox: THREE.Box3 | null = null;

  private pose: Pose = { roll: 0, pitch: 0, yaw: 0 };
  private finish = '';
  private autorotate = false;
  private dirty = false;
  private userMoved = false;
  private disposed = false;
  private lastW = 0;
  private lastH = 0;

  constructor(host: HTMLElement, src: string, private options: NgsViewerOptions = {}) {
    this.host = host;

    const w = host.clientWidth || 600;
    const h = host.clientHeight || 420;

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);
    // Nothing is drawn behind the model: the page background shows through the
    // canvas so the viewer reads as the object alone, not as a boxed panel.
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    const canvas = this.renderer.domElement;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.cursor = 'grab';
    host.appendChild(canvas);

    this.scene = new THREE.Scene();
    this.pmrem = new THREE.PMREMGenerator(this.renderer);
    this.environment = this.pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
    this.scene.environment = this.environment;
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

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.ShadowMaterial({ opacity: 0.22 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.enablePan = false;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 22;
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.addEventListener('start', () => {
      this.userMoved = true;
    });

    this.ro = new ResizeObserver(() => {
      // Defer out of the observer callback: resizing the canvas inside it
      // retriggers the observer.
      cancelAnimationFrame(this.resizeRaf);
      this.resizeRaf = requestAnimationFrame(() => this.resize());
    });
    this.ro.observe(host);

    this.load(src);
    this.renderer.setAnimationLoop(() => this.tick());
  }

  private load(url: string) {
    loadOnce(url)
      .then((gltf) => {
        if (this.disposed) return;
        // Clone per viewer so each can pose its own gimbals; materials stay
        // shared, so a finish change paints every viewer at once.
        const root = gltf.scene.clone(true);
        root.traverse((o) => {
          const mesh = o as THREE.Mesh;
          if (mesh.isMesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        this.joints = {};
        for (const name of ['Pitch', 'Yaw', 'Roll'] as const) {
          const node = root.getObjectByName(name);
          if (node) {
            this.joints[name.toLowerCase() as JointName] = { node, base: node.quaternion.clone() };
          }
        }

        // "Black" is the product's base structure material — the one the finish
        // selector repaints. It is shared across the base, rings and gondola.
        this.finishMaterials = [];
        root.traverse((o) => {
          const mesh = o as THREE.Mesh;
          const mats = mesh.isMesh ? (Array.isArray(mesh.material) ? mesh.material : [mesh.material]) : [];
          for (const m of mats as THREE.MeshStandardMaterial[]) {
            if (m && m.name === 'Black' && !this.finishMaterials.some((f) => f.material === m)) {
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
        this.options.onReady?.();
      })
      .catch((err) => {
        loads.delete(url); // let a later mount retry a failed fetch
        console.error('GLB load failed', err instanceof Error ? err.message : err, url);
        this.options.onError?.(err);
      });
  }

  /* Roll / pitch / yaw used to arrive as three separate attribute writes per
     update. Applying each on its own rendered intermediate poses and made the
     gimbals judder, so updates are still coalesced into the next frame. */
  setPose(pose: Partial<Pose>) {
    let changed = false;
    for (const k of JOINTS) {
      const next = pose[k];
      if (typeof next === 'number' && next !== this.pose[k]) {
        this.pose[k] = next;
        changed = true;
      }
    }
    if (changed) this.invalidate();
  }

  setFinish(hex: string) {
    if (hex === this.finish) return;
    this.finish = hex;
    this.invalidate();
  }

  setAutorotate(on: boolean) {
    this.autorotate = on;
  }

  private invalidate() {
    this.dirty = true;
    // rAF is throttled to a stop while the page is hidden, and a frame
    // scheduled then would keep every later update coalesced behind it.
    if (document.hidden) {
      queueMicrotask(() => this.flush());
      return;
    }
    if (this.coalesce) return;
    this.coalesce = requestAnimationFrame(() => {
      this.coalesce = 0;
      this.flush();
    });
  }

  private flush() {
    if (!this.dirty) return;
    this.dirty = false;
    this.apply();
    this.draw();
  }

  /* Paint one frame immediately: the rAF loop is throttled while the page is
     hidden, and image capture needs a frame in the buffer. */
  private draw() {
    if (this.model && !this.disposed) this.renderer.render(this.scene, this.camera);
  }

  private apply() {
    this.paint();
    const q = new THREE.Quaternion();
    for (const key of JOINTS) {
      const j = this.joints[key];
      if (!j) continue;
      const axisName = AXIS[key];
      const axis = new THREE.Vector3(axisName === 'x' ? 1 : 0, 0, axisName === 'z' ? 1 : 0);
      q.setFromAxisAngle(axis, this.pose[key] * DEG);
      if (SPACE[key] === 'parent') j.node.quaternion.copy(q).multiply(j.base);
      else j.node.quaternion.copy(j.base).multiply(q);
    }
  }

  private paint() {
    for (const f of this.finishMaterials) {
      if (this.finish) f.material.color.set(this.finish);
      else f.material.color.copy(f.base);
    }
  }

  /* Distance at which the whole bounding sphere fits the frame, vertically and
     horizontally — the horizontal term is what a narrow frame needs. */
  private fit() {
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
        p.set(
          c & 1 ? this.worldBox.max.x : this.worldBox.min.x,
          c & 2 ? this.worldBox.max.y : this.worldBox.min.y,
          c & 4 ? this.worldBox.max.z : this.worldBox.min.z,
        ).project(this.camera);
        extent = Math.max(extent, Math.abs(p.x), Math.abs(p.y));
      }
      if (Math.abs(extent - 0.94) < 0.02) break;
      d *= extent / 0.94;
      this.camera.position.copy(this.controls.target).add(dir.clone().multiplyScalar(d));
      this.controls.update();
    }
    this.draw();
  }

  private resize() {
    if (this.disposed) return;
    const w = this.host.clientWidth;
    const h = this.host.clientHeight;
    if (!w || !h || (w === this.lastW && h === this.lastH)) return;
    this.lastW = w;
    this.lastH = h;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.userMoved) this.draw();
    else this.fit();
  }

  private tick() {
    this.flush();
    this.controls.autoRotate = this.autorotate;
    this.controls.autoRotateSpeed = 0.6;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.resizeRaf);
    cancelAnimationFrame(this.coalesce);
    this.renderer.setAnimationLoop(null);
    this.ro.disconnect();
    this.controls.dispose();
    // Geometry and materials belong to the cached GLTF and are shared with
    // every other viewer, so only this viewer's own resources are released.
    this.environment.dispose();
    this.pmrem.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
