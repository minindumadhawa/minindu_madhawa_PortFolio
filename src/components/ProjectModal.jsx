import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle, Tag } from 'lucide-react';
import { Github } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Image */}
        <div className="modal-image-wrapper">
          <img src={project.image} alt={project.title} className="modal-img" />
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
          <div className="modal-actions">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Github size={18} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
