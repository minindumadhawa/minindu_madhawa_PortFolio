import React, { useState } from 'react';
import { FolderGit2, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import DesktopMockup from './DesktopMockup';
import ProjectModal from './ProjectModal';

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
                onViewDetails={() => setSelectedProject(project)}
              />

              {/* Card Body - ONLY Title / Name */}
              <div className="project-card-body">
                <h3 className="project-title">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="view-all-projects-wrapper">
          <button onClick={onViewAllProjects} className="btn btn-primary view-all-btn">
            <span>Recent Projects</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Project Full Details Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
}
