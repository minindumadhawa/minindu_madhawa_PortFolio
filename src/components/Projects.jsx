import React, { useState } from 'react';
import { FolderGit2, ExternalLink, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { Github } from './SocialIcons';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import DesktopMockup from './DesktopMockup';

export default function Projects({ onViewAllProjects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // Display top 3 main projects on the Home Page
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <FolderGit2 size={16} />
            <span>Featured Work</span>
          </div>
          <h2>Explore My <span className="gradient-text">Featured Projects</span></h2>
          <p>A selection of main web applications, platforms, and software products.</p>
        </div>

        {/* Projects Grid (Main 3 Projects) */}
        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card">
              {/* Desktop Mockup Preview */}
              <DesktopMockup
                image={project.image}
                title={project.title}
                demoUrl={project.demoUrl}
                category={project.category}
              >
                <div className="project-img-overlay">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="overlay-view-btn btn btn-primary"
                  >
                    <Eye size={18} />
                    <span>View Case Study</span>
                  </button>
                </div>
              </DesktopMockup>

              {/* Card Body */}
              <div className="project-card-body">
                <h3 className="project-title" onClick={() => setSelectedProject(project)}>
                  {project.title}
                </h3>
                <p className="project-desc">{project.description}</p>

                {/* Tech tags */}
                <div className="project-tags">
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="tag-pill">{tag}</span>
                  ))}
                  {project.tags.length > 4 && <span className="tag-pill">+{project.tags.length - 4}</span>}
                </div>

                {/* Bottom Card Footer */}
                <div className="project-card-footer">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="details-link"
                  >
                    Details <Sparkles size={14} />
                  </button>

                  <div className="project-card-socials">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="card-icon-link" title="GitHub">
                      <Github size={18} />
                    </a>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="card-icon-link" title="Live Demo">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="view-all-projects-wrapper">
          <button onClick={onViewAllProjects} className="btn btn-primary view-all-btn">
            <span>View All Projects</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
