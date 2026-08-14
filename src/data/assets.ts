/* Static assets live in /public/assets and are referenced by URL (the GLB is
   fetched at runtime by the viewer, so none of these go through the bundler). */

const asset = (path: string) => `${import.meta.env.BASE_URL}assets/${path}`;

export const ASSETS = {
  model: asset('NGS-360-3-B.glb'),
  operator: asset('ngs-operator.png'),
  cockpit: asset('ngs-cockpit.png'),
  front: asset('ngs-front.png'),
  hq: asset('covisart-hq.jpg'),
};
