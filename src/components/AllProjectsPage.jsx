import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Eye, Sparkles, ExternalLink, FolderGit2, Layers } from 'lucide-react';
import { Github } from './SocialIcons';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import DesktopMockup from './DesktopMockup';

export default function AllProjectsPage({ onBackToHome }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Full Stack', 'Frontend', 'App Development'];

  const filteredProjects = projectsData.filter((p) => {
    const matchesCategory = activeFilter === 'All' || p.category.toLowerCase() === activeFilter.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query ||
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="all-projects-page section">
      <div className="container">
        {/* Back Button & Top Navigation */}
        <div className="all-projects-header-nav">
          <button onClick={onBackToHome} className="back-home-btn">
            <ArrowLeft size={18} />
            <span>Back to Portfolio</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <FolderGit2 size={16} />
            <span>Complete Showcase</span>
          </div>
          <h2>All My <span className="gradient-text">Projects & Products</span></h2>
          <p>Explore the complete collection of web platforms, full-stack applications, and mobile software.</p>
        </div>

        {/* Controls Bar: Search & Category Filters */}
        <div className="all-projects-controls">
          {/* Search Box */}
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, technology, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="project-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="clear-search-btn">
                &times;
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="project-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
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

                  {/* Card Footer */}
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
        ) : (
          <div className="no-projects-found glass-card">
            <Layers size={48} className="no-projects-icon" />
            <h3>No projects found</h3>
            <p>No projects match your search query "{searchQuery}". Try clearing filters.</p>
            <button onClick={() => { setActiveFilter('All'); setSearchQuery(''); }} className="btn btn-primary mt-4">
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="all-projects-bottom-back">
          <button onClick={onBackToHome} className="btn btn-secondary">
            <ArrowLeft size={18} />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
