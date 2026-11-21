import Image from 'next/image';
import type { Project } from '@/lib/data';
import Icon from './Icon';

export default function ProjectCover({ project, index, detail = false }: { project: Project; index?: number; detail?: boolean }) {
  return (
    <div className={detail ? 'case-art' : 'project-art'} data-project={project.slug} data-image-kind={project.imageKind}>
      <div className="project-shot">
        <Image src={project.image} alt={project.imageAlt} fill preload={detail} sizes="(max-width: 700px) 90vw, 760px" />
      </div>
      {index !== undefined && <span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
      {!detail && <span className="project-arrow"><Icon name="up-right" size={26} /></span>}
    </div>
  );
}
