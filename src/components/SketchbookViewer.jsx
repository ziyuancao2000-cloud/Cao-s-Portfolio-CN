import { memo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function SketchbookViewer({ item, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!item) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus?.focus?.();
    };
  }, [item, onClose]);

  if (!item) return null;

  const metadata = [item.year, item.location, item.type].filter(Boolean);
  const accessibleTitle = item.titleZh || item.title || '速写本作品';

  // Escape the page's animated stacking context so the viewer stays above navigation.
  return createPortal(
    <div
      className="sketchbook-viewer"
      role="dialog"
      aria-modal="true"
      aria-label={accessibleTitle}
      onClick={onClose}
      onWheel={(event) => event.stopPropagation()}
    >
      <button
        ref={closeButtonRef}
        className="sketchbook-viewer__close"
        type="button"
        onClick={onClose}
        aria-label="关闭大图"
      >
        <span>关闭</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 5l14 14M19 5L5 19" />
        </svg>
      </button>

      <figure className="sketchbook-viewer__figure" onClick={(event) => event.stopPropagation()}>
        <img src={item.image} alt={accessibleTitle} />
        <figcaption>
          <div className="sketchbook-viewer__titles">
            {item.titleZh ? <strong>{item.titleZh}</strong> : null}
            {item.title ? <span lang="en">{item.title}</span> : null}
          </div>
          {metadata.length ? <p>{metadata.join(' · ')}</p> : null}
          {item.descriptionZh ? <p className="sketchbook-viewer__description">{item.descriptionZh}</p> : null}
        </figcaption>
      </figure>
    </div>,
    document.body,
  );
}

export default memo(SketchbookViewer);
