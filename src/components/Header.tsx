import Link from 'next/link';
import Icon from './Icon';

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
          <Link href="/contacto" className="nav-contact">Contacto <Icon name="up-right" size={14} /></Link>
        </div>
      </nav>
    </header>
  );
}
