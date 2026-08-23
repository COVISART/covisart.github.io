import type { CSSProperties, ReactNode } from 'react';

interface BlueprintProps {
  /** `figure` where the frame wraps an image or the live model. */
  as?: 'div' | 'figure';
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** The design system's wireframe frame: hairline border plus registration
    marks at the four corners (see .blueprint in styles/industry.css). */
export function Blueprint({ as: Tag = 'div', className, style, children }: BlueprintProps) {
  return (
    <Tag className={className ? `blueprint ${className}` : 'blueprint'} style={style}>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
      {children}
    </Tag>
  );
}
