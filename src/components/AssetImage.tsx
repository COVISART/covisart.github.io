import { useState } from 'react';
import type { CSSProperties } from 'react';

interface AssetImageProps {
  src: string;
  alt: string;
  style?: CSSProperties;
}

/** Product renders live in /public/assets. If one is missing the frame keeps
    its place and names what belongs there rather than collapsing the layout. */
export function AssetImage({ src, alt, style }: AssetImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="viewer-fallback" style={{ minHeight: 200, ...style }}>
        <span>{alt}</span>
      </div>
    );
  }

  return <img src={src} alt={alt} loading="lazy" style={style} onError={() => setFailed(true)} />;
}
