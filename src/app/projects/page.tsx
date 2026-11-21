import type { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard';
import ProjectExplorer from '@/components/ProjectExplorer';
import { projects, siteUrl } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Explora los proyectos de software de Yojhan Huanca Yucra.',
  ...(siteUrl && { alternates: { canonical: '/projects' } }),
};

export default function ProjectsPage() {
  return (
    <section className="shell inner-page">
      <h1>Proyectos<span>.</span></h1>
      <p className="page-intro">Aplicaciones empresariales, comercio electrónico, cine y video con IA.</p>
      <ProjectExplorer entries={projects.map((project, index) => ({
        slug: project.slug,
        category: project.category,
        text: [project.title, project.category, project.description, ...project.technologies].join(' '),
        card: <ProjectCard project={project} index={index} />,
      }))} />
    </section>
  );
}
