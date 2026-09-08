import React, { useEffect } from 'react';
import { X, CheckCircle, Tag } from 'lucide-react';
import { Github } from './SocialIcons';
import DesktopMockup from './DesktopMockup';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  // Body scroll lock & ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Desktop Mockup Preview */}
        <div className="modal-desktop-wrapper">
          <DesktopMockup
            image={project.image}
            title={project.title}
            demoUrl={project.demoUrl}
            category={project.category}
            isModal={true}
          />
          <div className="modal-category-pill">{project.category}</div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-full-desc">{project.fullDescription || project.description}</p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-highlights">
              <h4>Key Project Features:</h4>
              <ul>
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>
                    <CheckCircle size={16} className="highlight-check-icon" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="modal-tech-stack">
            <h4>Technologies Used:</h4>
            <div className="tech-tags-list">
              {project.tags.map((tag, idx) => (
                <span key={idx} className="tech-tag">
                  <Tag size={12} />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          {project.githubUrl && (
            <div className="modal-actions">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary source-btn">
                <Github size={15} />
                <span>Source Code</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
