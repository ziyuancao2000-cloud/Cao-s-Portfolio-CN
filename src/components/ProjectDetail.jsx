import { useCallback, useEffect, useState } from 'react';

function ProjectIntro({ project }) {
  const displayTitle = project.titleZh ?? project.title;

  return (
    <section className="project-intro" aria-labelledby={`project-intro-${project.id}`}>
      <div className="project-intro__content">
        <h1 className="project-intro__title" id={`project-intro-${project.id}`}>{displayTitle}</h1>
        <p className="project-intro__title-en" lang="en">{project.title}</p>

        <div className="project-intro__meta">
          <p>{project.city} · {project.country}</p>
          <p>{project.year}</p>
          <p>{project.type}</p>
        </div>

        {project.statementZh ? (
          <div className="project-intro__statement">
            <p className="project-intro__statement-label">
              <span>设计说明</span>
              <span lang="en">Design Statement</span>
            </p>
            <p className="project-intro__statement-copy">{project.statementZh}</p>
          </div>
        ) : null}
      </div>

    </section>
  );
}

export default function ProjectDetail({ project, onClose }) {
  const [isClosing, setIsClosing] = useState(false);
  const requestClose = useCallback(() => setIsClosing(true), []);

  useEffect(() => {
    if (!project) return undefined;
    setIsClosing(false);
    const onKey = (event) => event.key === 'Escape' && requestClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, requestClose]);

  if (!project) return null;
  const gallery = project.gallery?.length ? project.gallery : [project.image];
  return (
    <section
      className={`project-detail${isClosing ? ' project-detail--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onAnimationEnd={(event) => {
        if (isClosing && event.target === event.currentTarget) onClose();
      }}
    >
      <button className="project-detail__close" type="button" onClick={requestClose} aria-label="关闭项目">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
      </button>
      <ProjectIntro project={project} />
      <div
        className="project-detail__gallery"
        aria-label={`${project.title} 项目展板`}
        onClick={(event) => event.target === event.currentTarget && requestClose()}
      >
        {gallery.map((image, index) => (
          <figure key={image}>
            <div className="project-detail__sheet-number">{String(index + 1).padStart(2, '0')}</div>
            <img src={image} alt={`${project.title} 项目展板 ${index + 1}`} loading={index > 1 ? 'lazy' : 'eager'} />
          </figure>
        ))}
      </div>
    </section>
  );
}
