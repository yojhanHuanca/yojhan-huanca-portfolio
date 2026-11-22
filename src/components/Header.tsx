import Link from 'next/link';
import Icon from './Icon';
import QuickNav from './QuickNav';
import { projects } from '@/lib/data';

const destinations = [
  { title: 'Proyectos', description: 'Catálogo y filtros', url: '/projects' },
  { title: 'Tecnologías', description: 'Explorador del stack técnico', url: '/#tecnologias' },
  { title: 'Recorrido visual', description: 'Interfaz, procesamiento y datos', url: '/#recorrido' },
  { title: 'Sobre mí', description: 'Experiencia y formación en TECSUP', url: '/about' },
  { title: 'Contacto', description: 'Correo y GitHub', url: '/contacto' },
  ...projects.map((project) => ({ title: project.title, description: project.technologies.join(' · '), url: `/projects/${project.slug}` })),
];

export default function Header() {
  return (
    <header className="site-header">
      <nav className="shell nav" aria-label="Navegación principal">
        <Link href="/" className="brand" aria-label="Yojhan Huanca, inicio">
          <span className="brand-mark"><Icon name="code" size={19} /></span><span>Yojhan<span className="brand-last"> Huanca</span></span>
        </Link>
        <div className="nav-links">
          <Link href="/projects">Proyectos</Link>
          <Link href="/about">Sobre mí</Link>
          <QuickNav entries={destinations} />
          <Link href="/contacto" className="nav-contact">Contacto <Icon name="up-right" size={14} /></Link>
        </div>
      </nav>
    </header>
  );
}
