'use client';

import { useState } from 'react';
import type { CSSProperties } from 'react';

import Link from 'next/link';
import Icon from './Icon';
import { categories, technologies } from '@/lib/technologies';

type ProjectLink = { title: string; slug: string; technologies: string[] };

export default function TechAtlas({ projects }: { projects: ProjectLink[] }) {
  const [category, setCategory] = useState<(typeof categories)[number] | 'Todas'>('Frontend');
  const [selected, setSelected] = useState(technologies[0]);
  const visible = category === 'Todas' ? technologies : technologies.filter((tech) => tech.category === category);
  const examples = projects.filter((project) => project.technologies.includes(selected.name));

  function advance(direction: number) {
    const position = visible.findIndex((tech) => tech.slug === selected.slug);
    setSelected(visible[(position + direction + visible.length) % visible.length]);
  }

  function chooseCategory(next: typeof category) {
    setCategory(next);
    if (next !== 'Todas' && next !== selected.category) {
      setSelected(technologies.find((tech) => tech.category === next) ?? technologies[0]);
    }
  }

  return (
    <section className="tech-atlas" id="tecnologias" aria-labelledby="atlas-title">
      <div className="shell tech-shell">
        <header className="tech-heading">
          <p className="section-label">Stack técnico</p>
          <h2 id="atlas-title">Tecnologías en acción.</h2>
          <p>Explora por área y elige un logo para ver qué hace y en qué proyectos aparece.</p>
        </header>
        <div className="atlas-filters" aria-label="Filtrar tecnologías">
          {[...categories, 'Todas' as const].map((item) =>
            <button key={item} type="button" onClick={() => chooseCategory(item)} aria-pressed={category === item}>{item}</button>
          )}
        </div>
        <div className="atlas-layout">
          <div key={category} className="atlas-grid" aria-label={`Tecnologías de ${category}`}>
            {visible.map((tech, index) => (
              <button key={tech.slug} type="button" aria-pressed={selected.slug === tech.slug} onClick={() => setSelected(tech)} style={{ '--tech-color': tech.color, '--order': Math.min(index, 10) } as CSSProperties}>
                <span className="tech-tile-logo" aria-hidden="true" style={{ maskImage: `url(/tech/${tech.slug}.svg)` }} />
                <span>{tech.name}</span>
              </button>
            ))}
          </div>
          <div className="atlas-details">
            <div className="atlas-details-content" aria-live="polite" key={selected.slug} style={{ '--tech-color': selected.color } as CSSProperties}>
              <div className="atlas-emblem">
                <i /><i />
                <div className="atlas-logo" aria-hidden="true" style={{ maskImage: `url(/tech/${selected.slug}.svg)` }} />
              </div>
              <p className="atlas-category">{selected.category}</p>
              <h3>{selected.name}</h3>
              <p>{selected.description}</p>
              {examples.length > 0 && <ul className="atlas-examples">{examples.map((project) =>
                <li key={project.slug}><Link href={`/projects/${project.slug}`}>{project.title} <Icon name="up-right" size={13} /></Link></li>
              )}</ul>}
              {selected.slug === 'nextdotjs' && <p className="atlas-example-note">Este portafolio está hecho con Next.js.</p>}
            </div>
              <div className="atlas-pagination" aria-label="Carrusel de tecnologías">
                <button type="button" onClick={() => advance(-1)} aria-label="Tecnología anterior"><Icon name="left" size={19} /></button>
                <span>{visible.findIndex((tech) => tech.slug === selected.slug) + 1} / {visible.length}</span>
                <button type="button" onClick={() => advance(1)} aria-label="Siguiente tecnología"><Icon name="right" size={19} /></button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
