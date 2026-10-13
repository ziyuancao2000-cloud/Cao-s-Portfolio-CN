import { memo, useCallback, useState } from 'react';
import SketchbookViewer from './SketchbookViewer';

function SketchbookPage({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const closeViewer = useCallback(() => setSelectedItem(null), []);

  return (
    <section className="sketchbook-page" id="sketchbook" aria-labelledby="sketchbook-title">
      <header className="sketchbook-page__intro">
        <h1 id="sketchbook-title">
          <span className="sketchbook-page__title-zh">速写本</span>
          <span className="sketchbook-page__title-en" lang="en">Sketchbook</span>
        </h1>
        <p className="sketchbook-page__description">
          <span>记录手稿、速写、观察与自由创作。</span>
          <small lang="en">Sketches, studies, observations, and personal visual work.</small>
        </p>
      </header>

      {items.length ? (
        <div className="sketchbook-grid">
          {items.map((item) => {
            const metadata = [item.year, item.location, item.type].filter(Boolean);
            const accessibleTitle = item.titleZh || item.title || '速写本作品';

            return (
              <figure className="sketchbook-item" key={item.id}>
                <button type="button" onClick={() => setSelectedItem(item)} aria-label={`查看${accessibleTitle}`}>
                  <img src={item.image} alt={accessibleTitle} loading="lazy" decoding="async" />
                </button>
                <figcaption>
                  <div>
                    {item.titleZh ? <strong>{item.titleZh}</strong> : null}
                    {item.title ? <span lang="en">{item.title}</span> : null}
                  </div>
                  {metadata.length ? <p>{metadata.join(' · ')}</p> : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      ) : (
        <div className="sketchbook-empty" role="status">
          <p>内容正在整理中。</p>
          <span lang="en">Work in progress</span>
        </div>
      )}

      <SketchbookViewer item={selectedItem} onClose={closeViewer} />
    </section>
  );
}

export default memo(SketchbookPage);
