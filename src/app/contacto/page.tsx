import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import CopyEmail from '@/components/CopyEmail';
import { personalInfo, siteUrl } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta a Yojhan Huanca Yucra por correo o encuentra sus proyectos en GitHub.',
  ...(siteUrl && { alternates: { canonical: '/contacto' } }),
};

export default function ContactPage() {
  return (
    <section className="shell inner-page contact-page">
      <p className="section-label">Contacto</p>
      <h1>Hablemos<span>.</span></h1>
      <p className="page-intro">Escríbeme si tienes una idea, quieres colaborar o te interesa saber más sobre alguno de mis proyectos.</p>
      <div className="contact-methods">
        <a href={`mailto:${personalInfo.email}`}><Icon name="mail" size={38} /><span><strong>Correo</strong><span>{personalInfo.email}</span></span><Icon name="up-right" size={23} /></a>
        <a href={personalInfo.github}><Icon name="github" size={38} /><span><strong>GitHub</strong><span>yojhanHuanca</span></span><Icon name="up-right" size={23} /></a>
      </div>
      <CopyEmail email={personalInfo.email} />
    </section>
  );
}
