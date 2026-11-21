import type { Metadata } from 'next';
import ProjectCover from '@/components/ProjectCover';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import { projects, siteUrl } from '@/lib/data';
import type { Project } from '@/lib/data';

type Props = { params: Promise<{ slug: string }> };

function findProject(slug: string): Project {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = findProject((await params).slug);
  return {
    title: project.title,
    description: project.description,
    ...(siteUrl && { alternates: { canonical: `/projects/${project.slug}` } }),
    openGraph: { title: project.title, description: project.description, images: project.image ? [project.image] : undefined },
    twitter: { card: 'summary_large_image', title: project.title, description: project.description, images: project.image ? [project.image] : undefined },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = findProject((await params).slug);
  return (
    <article className="shell inner-page case-study">
      <Link href="/projects" className="inline-link"><Icon name="left" size={18} /> Todos los proyectos</Link>
      <header>
        <p className="section-label">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="page-intro">{project.description}</p>
      </header>
      <figure className="case-figure"><ProjectCover project={project} detail /><figcaption>{project.imageKind === 'screenshot' ? 'Captura del proyecto' : 'Imagen del repositorio'} <a href={project.image} target="_blank" rel="noreferrer">Ver imagen a tamaño completo <Icon name="up-right" size={15} /></a></figcaption></figure>
      <div className="case-body">
        <h2>Sobre el proyecto</h2>
        <p>{project.context}</p>
        <ul className="tags">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
        {project.githubUrl && <a href={project.githubUrl} className="button button-primary">Ver código en GitHub <Icon name="up-right" size={18} /></a>}
      </div>
    </article>
  );
}
