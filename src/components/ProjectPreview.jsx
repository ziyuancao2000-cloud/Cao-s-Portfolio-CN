export default function ProjectPreview({ hover }) {
  if (!hover) return null;
  const project = hover.project;
  const cluster = hover.cluster;
  const clusterCity = hover.clusterCity ?? project.city;
  const displayTitle = (projectItem) => projectItem.titleZh ?? projectItem.title;
  const cardWidth = window.innerWidth <= 900 ? Math.min(300, window.innerWidth - 32) : 340;
  const gap = 28;
  const preferredLeft = hover.screen.x > window.innerWidth * 0.56
    ? hover.screen.x - cardWidth - gap
    : hover.screen.x + gap;
  const left = Math.min(window.innerWidth - cardWidth - 16, Math.max(16, preferredLeft));
  const top = Math.min(window.innerHeight - 390, Math.max(88, hover.screen.y - 170));

  return (
    <aside
      className="project-preview"
      style={{ left, top }}
      aria-live="polite"
    >
      <div className="project-preview__image-wrap">
        <img src={project.image} alt="" className="project-preview__image" />
        <span className="project-preview__index">{cluster ? `${String(cluster.length).padStart(2, '0')} / ${clusterCity}` : project.year}</span>
      </div>
      <div className="project-preview__body">
        <p className="project-preview__place">{cluster ? clusterCity : project.city} · {project.country}</p>
        <h2>{cluster ? `${clusterCity} · ${cluster.length} 个项目` : displayTitle(project)}</h2>
        {cluster ? (
          <>
            <p className="project-preview__cluster-hint">
              {cluster.map((projectItem, index) => (
                <span key={projectItem.id}>
                  {index > 0 && <br />}
                  {displayTitle(projectItem)}
                </span>
              ))}
            </p>
            <p className="project-preview__action">点击标记展开项目 <span>→</span></p>
          </>
        ) : (
          <>
            <p className="project-preview__cluster-hint">{project.type}<br />{project.year}</p>
            <p className="project-preview__action">点击标记查看项目 <span>→</span></p>
          </>
        )}
      </div>
    </aside>
  );
}
