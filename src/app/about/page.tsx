import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { siteUrl, skills } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: 'Formación, experiencia y tecnologías de Yojhan Huanca Yucra.',
  ...(siteUrl && { alternates: { canonical: '/about' } }),
};

export default function AboutPage() {
  return (
    <div className="shell inner-page about-page">
      <p className="section-label">Lima, Perú</p>
      <h1>Sobre mí<span>.</span></h1>
      <p className="page-intro">Soy Yojhan Huanca Yucra, estudiante de Diseño y Desarrollo de Software en TECSUP. Me interesa convertir procesos de trabajo en aplicaciones fáciles de usar.</p>
      <section className="about-block">
        <h2>Experiencia</h2>
        <ol className="timeline">
          <li><p>Julio a octubre de 2026</p><h3>Línea 1 del Metro de Lima</h3><p>Pasantía en Seguridad Operativa. Participé en el desarrollo de un sistema para registrar hallazgos e incidentes y dar seguimiento a los planes de acción.</p></li>
          <li><p>Formación técnica</p><h3>TECSUP</h3><p>Diseño y Desarrollo de Software. Desarrollo web y móvil, APIs y bases de datos.</p></li>
        </ol>
      </section>
      <section className="about-block">
        <h2>Tecnologías</h2>
        <dl className="skills">{skills.map(({ label, tools }) => <div key={label}><dt>{label}</dt><dd>{tools}</dd></div>)}</dl>
      </section>
      <Link className="button button-primary" href="/contacto">Contáctame <Icon name="up-right" size={17} /></Link>
    </div>
  );
}
