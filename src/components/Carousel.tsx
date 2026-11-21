'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

export default function Carousel({ children, count }: { children: React.ReactNode; count: number }) {
  const track = useRef<HTMLDivElement>(null);
  const region = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointer: number; start: number; scroll: number; moved: boolean } | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);

  function goTo(index: number) {
    const list = track.current;
    const item = list?.children.item(index);
    if (!list || !(item instanceof HTMLElement)) return;
    list.scrollTo({
      left: item.offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }

  function closestSlide(list: HTMLDivElement) {
    return Array.from(list.children).reduce((best, child, index) =>
      Math.abs((child as HTMLElement).offsetLeft - list.scrollLeft) <
      Math.abs((list.children[best] as HTMLElement).offsetLeft - list.scrollLeft) ? index : best, 0);
  }

  function sync() {
    if (track.current) setActive(closestSlide(track.current));
  }

  useEffect(() => {
    if (!region.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(region.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !visible) return;
    const timer = window.setTimeout(() => {
      if (!document.hidden) goTo((active + 1) % count);
      else setPlaying(false);
    }, 5200);
    return () => window.clearTimeout(timer);
  }, [playing, visible, active, count]);

  function select(index: number) {
    setPlaying(false);
    goTo(index);
  }

  function finishDrag(event: React.PointerEvent<HTMLDivElement>) {
    const gesture = drag.current;
    drag.current = null;
    if (!gesture?.moved) return;
    const list = event.currentTarget;
    delete list.dataset.dragging;
    goTo(closestSlide(list));
  }

  return (
    <div className="carousel" ref={region} role="region" aria-label="Carrusel de proyectos" onFocusCapture={() => setPlaying(false)}>
      <div
        className="carousel-track" ref={track} onScroll={sync}
        onDragStart={(event) => event.preventDefault()}
        onPointerDown={(event) => {
          setPlaying(false);
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          drag.current = { pointer: event.pointerId, start: event.clientX, scroll: event.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={(event) => {
          const gesture = drag.current;
          if (!gesture || gesture.pointer !== event.pointerId || !(event.buttons & 1)) return;
          const distance = event.clientX - gesture.start;
          if (!gesture.moved && Math.abs(distance) < 7) return;
          const list = event.currentTarget;
          if (!gesture.moved) {
            gesture.moved = true;
            list.dataset.dragging = 'true';
            list.setPointerCapture(event.pointerId);
          }
          list.scrollLeft = gesture.scroll - distance;
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
      >{children}</div>
      <div className="carousel-controls">
        <div className="carousel-pages" aria-label="Elegir proyecto">
          {Array.from({ length: count }, (_, index) => (
            <button type="button" key={index} onClick={() => select(index)} aria-label={`Ver proyecto ${index + 1}`} aria-current={index === active ? 'true' : undefined}><span>{String(index + 1).padStart(2, '0')}</span></button>
          ))}
        </div>
        <div className="carousel-arrows">
          <button type="button" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pausar carrusel' : 'Reproducir carrusel'}><Icon name={playing ? 'pause' : 'play'} size={18} /></button>
          <button type="button" onClick={() => select((active + count - 1) % count)} aria-label="Proyecto anterior"><Icon name="left" /></button>
          <button type="button" onClick={() => select((active + 1) % count)} aria-label="Siguiente proyecto"><Icon name="right" /></button>
        </div>
      </div>
    </div>
  );
}
