import React, { useEffect, useRef } from 'react';

interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: string;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.0,
  scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~',
  className = '',
  style = {},
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timeouts = useRef<{[key: number]: NodeJS.Timeout}>({});
  const intervals = useRef<{[key: number]: NodeJS.Timeout}>({});

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      charRefs.current.forEach((span, index) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

        if (dist < radius) {
          // Calculate intensity based on distance (0 to 1)
          const intensity = 1 - dist / radius;
          
          // If not already scrambling or if we want to re-trigger
          if (!intervals.current[index]) {
             startScramble(index, intensity);
          }
        }
      });
    };

    const startScramble = (index: number, intensity: number) => {
      const span = charRefs.current[index];
      if (!span) return;
      
      // Clear existing
      if (intervals.current[index]) clearInterval(intervals.current[index]);
      if (timeouts.current[index]) clearTimeout(timeouts.current[index]);

      const originalChar = children[index];
      if (originalChar === ' ') return; // Don't scramble spaces

      // Scramble
      intervals.current[index] = setInterval(() => {
        const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        if (span) span.innerText = randomChar;
      }, 50);

      // Reset after duration
      const durationMs = duration * 1000 * intensity;
      // Ensure a minimum duration so the effect is visible
      const finalDuration = Math.max(300, durationMs);

      timeouts.current[index] = setTimeout(() => {
        if (intervals.current[index]) {
          clearInterval(intervals.current[index]);
          delete intervals.current[index];
        }
        if (span) span.innerText = originalChar;
      }, finalDuration);
    };

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      Object.values(intervals.current).forEach(clearInterval);
      Object.values(timeouts.current).forEach(clearTimeout);
    };
  }, [children, radius, duration, scrambleChars]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children.split('').map((char, i) => (
        <span 
          key={i} 
          ref={el => { charRefs.current[i] = el; }}
          className="inline-block"
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default ScrambledText;
