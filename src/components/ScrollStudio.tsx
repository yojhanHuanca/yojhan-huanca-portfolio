'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';

const chapters = [
  { title: 'Presentar información', text: 'En CinnSin, la interfaz convierte los datos de una API en una cartelera que puedes explorar.', label: 'Interfaz', image: '/art/cinnsin.webp', href: '/projects/cinnsin', project: 'CinnSin', tone: 'peach', tech: ['react', 'typescript'] },
  { title: 'Procesar contenido', text: 'En AutoClipper, el audio se transcribe y el video se divide en fragmentos listos para editar.', label: 'Procesamiento', image: '/art/autoclipper.webp', href: '/projects/autoclipper', project: 'AutoClipper', tone: 'mint', tech: ['ffmpeg', 'angular'] },
  { title: 'Organizar datos', text: 'En Línea 1, los registros conectan hallazgos, incidentes y el seguimiento de las acciones.', label: 'Datos', image: '/art/linea-1.webp', href: '/projects/linea-1', project: 'Línea 1', tone: 'blue', tech: ['postgresql', 'prisma'] },
];

export default function ScrollStudio() {
  const region = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = chapters[active];

  useEffect(() => {
    const section = region.current;
    const panel = stage.current;
    if (!section || !panel) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function update() {
      frame = 0;
      if (!section || !panel || reduced.matches || getComputedStyle(panel).position !== 'sticky') return;
      const top = Number.parseFloat(getComputedStyle(panel).top);
      const distance = Math.max(1, section.offsetHeight - panel.offsetHeight);
      const progress = Math.max(0, Math.min(1, (top - section.getBoundingClientRect().top) / distance));
      const step = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      panel.style.setProperty('--sequence', String(progress));
      panel.style.setProperty('--chapter-progress', String(Math.min(1, progress * chapters.length - step)));
      setActive(step);
    }

    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reduced.addEventListener('change', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      reduced.removeEventListener('change', schedule);
    };
  }, []);

  function choose(index: number) {
    const section = region.current, panel = stage.current;
    if (!section || !panel) return;
    if (getComputedStyle(panel).position !== 'sticky' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(index);
      return;
    }
    const offset = Number.parseFloat(getComputedStyle(panel).top);
    const travel = section.offsetHeight - panel.offsetHeight;
    window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - offset + travel * ((index + .24) / chapters.length), behavior: 'smooth' });
  }

  return (
    <section className="studio-sequence" id="recorrido" ref={region} aria-labelledby="studio-title">
      <div className="studio-sticky" ref={stage} data-tone={current.tone}>
        <div className="shell studio-shell">
          <header className="studio-header">
            <h2 id="studio-title">Así construyo software.</h2>
            <p>Desplázate o elige una etapa para explorar tres proyectos.</p>
          </header>
          <div className="studio-scene" aria-hidden="true">
            <div className="studio-ring studio-ring-1" /><div className="studio-ring studio-ring-2" />
            <div className="studio-layer studio-layer-back" /><div className="studio-layer studio-layer-mid" />
            <div className="studio-image" key={current.href}>
              <Image src={current.image} alt="" fill sizes="(max-width: 640px) 73vw, 480px" />
            </div>
            <div className="studio-logos">{current.tech.map((logo) =>
              <span key={logo}><Image src={`/tech/${logo}.svg`} width={20} height={20} alt="" unoptimized /></span>
            )}</div>
          </div>
          <div className="studio-caption" key={current.title}>
            <h3>{current.title}</h3><p>{current.text}</p>
            <Link href={current.href} className="inline-link">Ver {current.project} <Icon name="up-right" size={15} /></Link>
          </div>
          <div className="studio-steps" aria-label="Etapas del recorrido">
            {chapters.map((chapter, index) => <button key={chapter.label} type="button" aria-pressed={active === index} onClick={() => choose(index)}>{chapter.label}</button>)}
          </div>
        </div>
      </div>
    </section>
  );
}
