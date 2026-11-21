import Link from 'next/link';
import type { Project } from '@/lib/data';
import ProjectCover from './ProjectCover';

export default function ProjectCard({ project, index }: { project: Project; index?: number }) {
  return (
    <article className="project-card">
      <Link href={`/projects/${project.slug}`} className="project-link">
        <ProjectCover project={project} index={index} />
        <div className="project-copy">
          <p className="project-category">{project.category}</p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      </Link>
    </article>
  );
}
