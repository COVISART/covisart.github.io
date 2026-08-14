import { useEffect, useRef, useState } from 'react';
import { NgsViewer, type Pose } from './NgsViewer';
import { usePrefersReducedMotion } from '../site/usePrefersReducedMotion';

export interface NgsModelProps extends Partial<Pose> {
  src: string;
  autorotate?: boolean;
  /** Hex colour applied to the model's base structure material. */
  finish?: string;
  height: number;
  background?: string;
  /** Shown in place of the canvas if WebGL or the GLB is unavailable. */
  fallback: string;
  label: string;
}

export function NgsModel({
  src,
  roll = 0,
  pitch = 0,
  yaw = 0,
  autorotate = false,
  finish,
  height,
  background,
  fallback,
  label,
}: NgsModelProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<NgsViewer | null>(null);
  const [failed, setFailed] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  // The viewer is imperative, so the latest props are read through a ref when
  // it is (re)created rather than re-running the whole setup.
  const latest = useRef({ roll, pitch, yaw, finish, autorotate, reducedMotion });
  latest.current = { roll, pitch, yaw, finish, autorotate, reducedMotion };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let viewer: NgsViewer;
    try {
      viewer = new NgsViewer(host, src, { onError: () => setFailed(true) });
    } catch (err) {
      console.error('NGS viewer unavailable', err);
      setFailed(true);
      return;
    }

    const { roll: r, pitch: p, yaw: y, finish: f, autorotate: a, reducedMotion: rm } = latest.current;
    viewer.setPose({ roll: r, pitch: p, yaw: y });
    if (f) viewer.setFinish(f);
    viewer.setAutorotate(a && !rm);
    viewerRef.current = viewer;

    return () => {
      viewer.dispose();
      viewerRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    viewerRef.current?.setPose({ roll, pitch, yaw });
  }, [roll, pitch, yaw]);

  useEffect(() => {
    if (finish) viewerRef.current?.setFinish(finish);
  }, [finish]);

  useEffect(() => {
    viewerRef.current?.setAutorotate(autorotate && !reducedMotion);
  }, [autorotate, reducedMotion]);

  if (failed) {
    return (
      <div className="viewer-fallback" style={{ height, background }}>
        <span>{fallback}</span>
      </div>
    );
  }

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={label}
      style={{ width: '100%', height, position: 'relative', display: 'block', background }}
    />
  );
}
