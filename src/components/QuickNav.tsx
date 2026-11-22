'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';

type Entry = { title: string; description: string; url: string };

function normalize(value: string) {
  return value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
}

export default function QuickNav({ entries }: { entries: Entry[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState('');
  const terms = normalize(query).trim().split(/\s+/).filter(Boolean);
  const results = entries.filter((entry) => terms.every((term) => normalize(`${entry.title} ${entry.description}`).includes(term)));

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'k') return;
      event.preventDefault();
      if (dialog.current?.open) dialog.current.close();
      else {
        dialog.current?.showModal();
        input.current?.focus();
      }
    }
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);

  return (
    <>
      <button type="button" className="quick-trigger" aria-label="Buscar en el portafolio" aria-haspopup="dialog" onClick={() => { dialog.current?.showModal(); input.current?.focus(); }}>
        <Icon name="search" size={20} /><span>Buscar</span>
      </button>
      <dialog className="quick-dialog" ref={dialog} aria-labelledby="quick-title" onClose={() => setQuery('')} onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }} onKeyDown={(event) => {
        const items = list.current?.querySelectorAll('a');
        if (!items?.length) return;
        const position = Array.from(items).indexOf(document.activeElement as HTMLAnchorElement);
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          items[(position + 1) % items.length].focus();
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          if (position <= 0) input.current?.focus();
          else items[position - 1].focus();
        } else if (event.key === 'Enter' && event.target === input.current) {
          event.preventDefault();
          items[0].click();
        }
      }}>
        <div className="quick-sheet">
          <header><h2 id="quick-title">Buscar en el portafolio</h2><button type="button" onClick={() => dialog.current?.close()} aria-label="Cerrar búsqueda"><Icon name="close" size={19} /></button></header>
          <div className="quick-field"><Icon name="search" size={19} /><input ref={input} type="search" aria-label="Buscar secciones, proyectos y tecnologías" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Prueba React, D’Campo o contacto" /></div>
          <ul className="quick-results" ref={list}>{results.map((entry) => <li key={entry.url}>
            <Link href={entry.url} onClick={() => dialog.current?.close()}><span><strong>{entry.title}</strong><small>{entry.description}</small></span><Icon name="up-right" size={17} /></Link>
          </li>)}</ul>
          {results.length === 0 && <p role="status">Sin resultados. Prueba otra palabra.</p>}
          <p className="quick-hint"><kbd>Esc</kbd> cierra · <kbd>↑</kbd> <kbd>↓</kbd> navegan</p>
        </div>
      </dialog>
    </>
  );
}
