/* The GLB is Draco-compressed, so the viewer needs the Draco decoder at
   runtime. Rather than vendoring ~760 KB of decoder into git (or pulling it
   from a CDN, as the prototype did), copy the copy that ships with the
   installed three.js into public/draco before dev and build — that way the
   decoder can never drift from the three.js version that loads it. */

import { cp, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const from = resolve(root, 'node_modules/three/examples/jsm/libs/draco/gltf');
const to = resolve(root, 'public/draco');

await mkdir(to, { recursive: true });
await cp(from, to, { recursive: true });
console.log(`draco decoder → ${to}`);
