import Link from 'next/link';
import { personalInfo } from '@/lib/data';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Link href="/" className="brand"><span className="brand-mark"><Icon name="code" size={18} /></span> {personalInfo.name}</Link>
        <a href={personalInfo.github}>GitHub <Icon name="up-right" size={15} /></a>
        <Link href="/contacto">Contacto <Icon name="up-right" size={15} /></Link>
      </div>
    </footer>
  );
}
