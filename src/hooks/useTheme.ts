import { useState, useEffect } from 'react';

function readInitialIsDark(): boolean {
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    if (html.classList.contains('light')) return false;
  }

  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') !== 'light';
  }

  return true;
}

export function useTheme() {
  const [isDark, setIsDark] = useState(readInitialIsDark);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('light');
    } else {
      html.classList.add('light');
    }
    html.style.colorScheme = isDark ? 'dark' : 'light';
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', isDark ? '#00b4d8' : '#f0f4f8');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggle = () => {
    const newIsDark = !isDark;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const applyTheme = () => {
      const html = document.documentElement;
      html.classList.toggle('light', !newIsDark);
      html.style.colorScheme = newIsDark ? 'dark' : 'light';
      try { localStorage.setItem('theme', newIsDark ? 'dark' : 'light'); } catch { /* storage unavailable */ }
      // update theme-color meta
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', newIsDark ? '#00b4d8' : '#f0f4f8');
      setIsDark(newIsDark);
    };

    if (!document.startViewTransition || prefersReducedMotion) {
      applyTheme();
      return;
    }

    document.documentElement.classList.add('theme-premium-fade');
    const transition = document.startViewTransition(applyTheme);
    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-premium-fade');
    });
  };

  return { isDark, toggle };
}
