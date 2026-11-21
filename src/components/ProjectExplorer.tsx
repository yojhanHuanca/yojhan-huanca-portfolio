'use client';

import { useState } from 'react';

export default function ProjectExplorer({ entries }: { entries: { slug: string; category: string; text: string; card: React.ReactNode }[] }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const categories = [...new Set(entries.map((entry) => entry.category))];
  const normalize = (text: string) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const results = entries.filter((entry) => (!category || entry.category === category) && terms.every((term) => normalize(entry.text).includes(term)));

  return (
    <>
      <div className="explorer">
        <label htmlFor="project-search">Busca por nombre o tecnología</label>
        <div className="explorer-input"><input id="project-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Por ejemplo, React o PostgreSQL" /></div>
        <div className="filters" aria-label="Categorías de proyectos">
          <button type="button" aria-pressed={!category} onClick={() => setCategory('')}>Todos</button>
          {categories.map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
        </div>
      </div>
      <p className="result-count" role="status">{results.length} {results.length === 1 ? 'proyecto' : 'proyectos'}</p>
      {results.length ? <div className="projects-grid">{results.map((entry) => <div key={entry.slug}>{entry.card}</div>)}</div> : (
        <div className="empty-results">
          <p>No encontré proyectos con esos filtros.</p>
          <button className="button button-ghost" type="button" onClick={() => { setQuery(''); setCategory(''); }}>Limpiar búsqueda y filtros</button>
        </div>
      )}
    </>
  );
}
