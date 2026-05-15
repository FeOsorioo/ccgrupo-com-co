import { type CSSProperties } from 'react';

interface FluidBackgroundProps {
  colors?: [string, string, string];
  className?: string;
  style?: CSSProperties;
}

/**
 * Lightweight CSS-only animated gradient that mimics the visual feel of a
 * fluid/plasma background — zero JS runtime, ~1 KB CSS, fully GPU-composited.
 * Designed as a drop-in replacement for the previous Three.js `LiquidEther`
 * component (which alone weighed ~485 KB).
 */
export default function FluidBackground({
  colors = ['#0f1d35', '#0077b6', '#060d1f'],
  className = '',
  style,
}: FluidBackgroundProps) {
  const [c0, c1, c2] = colors;

  return (
    <div
      aria-hidden="true"
      className={`fluid-bg pointer-events-none absolute inset-0 ${className}`}
      style={
        {
          '--fb-c0': c0,
          '--fb-c1': c1,
          '--fb-c2': c2,
          ...style,
        } as CSSProperties
      }
    />
  );
}
