import React from 'react';
import { Cpu, Code2, Server, Database, GitBranch, Terminal, Layers, Cloud, Flame, Webhook, Box, Palette, FileCode } from 'lucide-react';
import { Figma } from './SocialIcons';
import { skillsData } from '../data/portfolioData';

// Helper to render Lucide icon dynamically
const IconRenderer = ({ iconName }) => {
  const iconMap = {
    Code2: <Code2 size={18} />,
    FileCode: <FileCode size={18} />,
    Palette: <Palette size={18} />,
    Layers: <Layers size={18} />,
    Server: <Server size={18} />,
    Webhook: <Webhook size={18} />,
    Database: <Database size={18} />,
    Flame: <Flame size={18} />,
    GitBranch: <GitBranch size={18} />,
    Box: <Box size={18} />,
    Cloud: <Cloud size={18} />,
    Figma: <Figma size={18} />
  };
  return iconMap[iconName] || <Terminal size={18} />;
};

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Cpu size={16} />
            <span>Tech Stack</span>
          </div>
          <h2>Skills & <span className="gradient-text">Proficiencies</span></h2>
          <p>Technologies, frameworks, and tools I use to bring ideas to life.</p>
        </div>

        <div className="skills-categories-grid">
          {skillsData.map((categoryGroup, index) => (
            <div key={index} className="glass-card skill-category-card">
              <h3 className="category-title">{categoryGroup.category}</h3>
              
              <div className="skills-list">
                {categoryGroup.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-name-wrap">
                        <span className="skill-icon"><IconRenderer iconName={skill.icon} /></span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>

                    <div className="progress-bar-track">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
