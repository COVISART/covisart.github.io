import { lazy, Suspense } from 'react';
import type { NgsModelProps } from './NgsModel';

/* three.js is by far the heaviest thing on the page and only two frames need
   it, so it loads in its own chunk after the document is interactive. */
const NgsModel = lazy(() => import('./NgsModel').then((m) => ({ default: m.NgsModel })));

export function LazyNgsModel(props: NgsModelProps) {
  return (
    <Suspense fallback={<div style={{ height: props.height, background: props.background }} aria-hidden="true" />}>
      <NgsModel {...props} />
    </Suspense>
  );
}
