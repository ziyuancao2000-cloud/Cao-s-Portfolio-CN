import { memo } from 'react';

function ProjectsIndex({ projects, onSelect }) {
  const cityCount = new Set(projects.map((project) => project.clusterCity ?? project.city)).size;

  return (
    <section className="projects-index" id="projects" aria-labelledby="projects-index-title">
      <div className="projects-index__intro">
        <div>
          <p>{String(projects.length).padStart(2, '0')} 个项目 · {String(cityCount).padStart(2, '0')} 个城市</p>
          <h1 id="projects-index-title">
            <span className="projects-index__title-zh">精选项目</span>
            <span className="projects-index__title-en" lang="en">Selected Projects</span>
          </h1>
        </div>
      </div>

      <div className={`projects-grid${projects.length === 1 ? ' projects-grid--single' : ''}`}>
        {projects.map((project, index) => (
          <button
            className="project-card"
            type="button"
            key={project.id}
            onClick={() => onSelect(project)}
            aria-label={`打开 ${project.titleZh ?? project.title}`}
          >
            <span className="project-card__image-wrap">
              <img src={project.image} alt="" className="project-card__image" />
              <span className="project-card__number">{String(index + 1).padStart(2, '0')}</span>
            </span>
            <span className="project-card__meta">
              <span>{project.city}, {project.country}</span>
              <span>{project.year}</span>
            </span>
            <span className="project-card__title-row">
              <strong>{project.titleZh ?? project.title}</strong>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 7l5 5-5 5" /></svg>
            </span>
            <span className="project-card__type">{project.type}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default memo(ProjectsIndex);
