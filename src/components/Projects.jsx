import React, { useState } from 'react';
import { FolderGit2, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import DesktopMockup from './DesktopMockup';
import ProjectModal from './ProjectModal';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Projects({ onViewAllProjects }) {
  const [selectedProject, setSelectedProject] = useState(null);

  // Display top 3 main projects on the Home Page
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="badge">
            <FolderGit2 size={16} />
            <span>Featured Work</span>
          </div>
          <h2>Explore My <span className="gradient-text">Featured Projects</span></h2>
          <p>A selection of main web applications, platforms, and software products.</p>
        </motion.div>

        {/* Projects Grid (Main 3 Projects) */}
        <motion.div 
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {featuredProjects.map((project) => (
            <motion.div 
              variants={fadeUp}
              key={project.id} 
              className="glass-card project-card"
              onClick={() => setSelectedProject(project)}
            >
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
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div 
          className="view-all-projects-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <button onClick={onViewAllProjects} className="btn btn-primary view-all-btn">
            <span>Recent Projects</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>
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
