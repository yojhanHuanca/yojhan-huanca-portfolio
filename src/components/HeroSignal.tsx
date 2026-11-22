'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const points = Array.from({ length: 740 }, (_, index) => {
  const t = index / 740 * Math.PI * 2;
  const r = 1 + .15 * Math.sin(t * 6);
  return [Math.cos(t) * r, Math.sin(t) * r, Math.sin(t * 3)] as const;
});

export default function HeroSignal() {
  const element = useRef<HTMLCanvasElement>(null);
  const frozen = useRef(false);
  const wake = useRef<(() => void) | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = element.current;
    const section = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !section || !ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = false;
    let width = 0;
    let height = 0;
    let aimX = 0;
    let aimY = 0;
    let offsetX = 0;
    let offsetY = 0;
    let time = 0;
    let last = 0;

    function draw(now: number) {
      frame = 0;
      if (!ctx) return;
      const running = visible && !document.hidden && !reduced.matches && !frozen.current;
      if (running && last) time += Math.min(40, now - last);
      last = running ? now : 0;
      offsetX += (aimX - offsetX) * .065;
      offsetY += (aimY - offsetY) * .065;
      ctx.clearRect(0, 0, width, height);
      const radius = Math.min(width * .44, height * 1.13);
      const turn = time * .00047 + offsetX * .52;
      const tilt = .62 + offsetY * .22;
      const cos = Math.cos(turn), sin = Math.sin(turn);
      for (let band = 0; band < 9; band++) {

        ctx.strokeStyle = band === 8 ? '#bdffde9c' : 'rgba(128, 240, 195, ' + (.13 + band * .027) + ')';
        ctx.lineWidth = band === 8 ? 1.6 : 1;
        ctx.beginPath();
        for (let i = band; i < points.length; i += 5) {
                    const [baseX, baseY, baseZ] = points[i];
          const drift = (band - 4) * .049;
          const x = baseX * (1 + drift), y = baseY * (1 + drift * .65);
          const z = baseZ + Math.sin(i * .042 + time * .00064) * drift * 2.2;
          const depth = x * sin + z * cos * .28;
          const expand = 1.25 / (1.44 - depth * .23);
          const xx = x * cos - z * sin * .28;
          const yy = y * tilt + depth * .31 + Math.sin(time * .001 + i * .17) * .013;
          const px = width * .5 + xx * radius * expand;
          const py = height * .64 + yy * radius * .61 * expand;
          if (band === 8) {
            ctx.moveTo(px, py);
            ctx.lineTo(px + 1, py + .55);
          } else if (i === band) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      if (running) frame = requestAnimationFrame(draw);
    }

    function refresh() {
      if (!frame) frame = requestAnimationFrame(draw);
    }

    function resize() {
      if (!canvas || !ctx) return;
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const ratio = Math.min(1.65, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      refresh();
    }

    function move(event: PointerEvent) {
      if (!section || reduced.matches || event.pointerType !== 'mouse') return;
      const bounds = section.getBoundingClientRect();
      aimX = (event.clientX - bounds.left) / bounds.width - .5;
      aimY = (event.clientY - bounds.top) / bounds.height - .5;
    }

    function resetPointer() { aimX = 0; aimY = 0; }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); });
    const sizes = new ResizeObserver(resize);
    observer.observe(section);
    sizes.observe(canvas);
    section.addEventListener('pointermove', move);
    section.addEventListener('pointerleave', resetPointer);
    document.addEventListener('visibilitychange', refresh);
    reduced.addEventListener('change', refresh);
    wake.current = refresh;
    resize();

    return () => {
      wake.current = null;
      cancelAnimationFrame(frame);
      observer.disconnect();
      sizes.disconnect();
      section.removeEventListener('pointermove', move);
      section.removeEventListener('pointerleave', resetPointer);
      document.removeEventListener('visibilitychange', refresh);
      reduced.removeEventListener('change', refresh);
    };
  }, []);

  return <>
    <canvas className="hero-signal" ref={element} aria-hidden="true" />
    <button className="hero-motion-toggle" type="button" aria-label={paused ? 'Reanudar la animación de portada' : 'Pausar la animación de portada'} onClick={() => {
      frozen.current = !frozen.current;
      setPaused(frozen.current);
      wake.current?.();
    }}><Icon name={paused ? 'play' : 'pause'} size={14} /></button>
  </>;
}
