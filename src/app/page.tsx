import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, siteUrl } from '@/lib/data';
import Carousel from '@/components/Carousel';
import HomeMotion from '@/components/HomeMotion';
import Icon from '@/components/Icon';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = { ...(siteUrl && { alternates: { canonical: '/' } }) };

export default function Home() {
  return (
    <HomeMotion>
      <section className="intro" aria-labelledby="hero-title">
        <div className="intro-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="shell intro-inner">
          <p className="intro-role"><span /> Desarrollador de software</p>
          <h1 id="hero-title"><span>Yojhan Huanca</span><span>Yucra.</span></h1>
          <p className="intro-summary">Desarrollo aplicaciones web y móviles, integro APIs y construyo herramientas que resuelven tareas concretas.</p>
          <div className="intro-actions">
            <Link className="button button-primary" href="#proyectos">Explorar proyectos <Icon name="down" size={19} /></Link>
            <Link className="button button-ghost" href="/contacto">Contacto <Icon name="up-right" size={17} /></Link>
          </div>
          <p className="intro-location">Lima, Perú</p>
        </div>
      </section>
      <section className="shell work-section" id="proyectos" aria-labelledby="proyectos-title">
        <div className="section-heading">
          <p className="section-label">Portafolio</p>
          <h2 id="proyectos-title">Proyectos destacados</h2>
          <p>Aplicaciones de video con IA, seguridad operativa, e-commerce y cine.</p>
        </div>
        <Carousel count={projects.length}>
          {projects.map((project, i) => <ProjectCard key={project.slug} project={project} index={i} />)}
        </Carousel>
        <Link className="inline-link work-all" href="/projects">Buscar en todos los proyectos <Icon name="up-right" size={19} /></Link>
      </section>
      <section className="profile-home">
        <div className="shell home-about">
          <p className="section-label">Experiencia</p>
          <h2>Del problema al software.</h2>
          <p>Estudio Diseño y Desarrollo de Software en TECSUP. Durante mi pasantía en Línea 1 del Metro de Lima trabajé en una aplicación para gestionar hallazgos e incidentes de seguridad operativa.</p>
          <Link href="/about" className="inline-link">Ver mi experiencia <Icon name="up-right" size={18} /></Link>
        </div>
      </section>
      <section className="contact-strip">
        <div className="shell"><h2>¿Trabajamos juntos?</h2><Link href="/contacto" className="button button-primary">Ponte en contacto <Icon name="up-right" size={19} /></Link></div>
      </section>
    </HomeMotion>
  );
}
