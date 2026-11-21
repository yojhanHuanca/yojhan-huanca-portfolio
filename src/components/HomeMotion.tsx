'use client';

import { useEffect, useRef } from 'react';


export default function HomeMotion({ children }: { children: React.ReactNode }) {
  const home = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = home.current;
    const intro = root?.querySelector<HTMLElement>('.intro');
    const gallery = root?.querySelector<HTMLElement>('.work-section');
    if (!root || !intro || !gallery) return;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function update() {
      frame = 0;
      if (!root || !intro || !gallery) return;
      const viewport = window.innerHeight;
      const limit = Math.max(1, document.documentElement.scrollHeight - viewport);
      const scroll = Math.max(0, window.scrollY);
      const hero = Math.min(1, scroll / Math.max(1, intro.offsetHeight * 0.78));
      const galleryTop = gallery.getBoundingClientRect().top;
      const reveal = Math.min(1, Math.max(0, (viewport * 0.88 - galleryTop) / (viewport * 0.7)));
      root.style.setProperty('--read-progress', String(Math.min(1, scroll / limit)));
      root.style.setProperty('--cover-progress', String(preference.matches ? 0 : hero));
      root.style.setProperty('--gallery-progress', String(preference.matches ? 1 : reveal));
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, []);

  return <div className="home-motion" ref={home}>
    <div className="reading-progress" aria-hidden="true" />
    {children}
  </div>;
}
