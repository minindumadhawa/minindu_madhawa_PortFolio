import React from 'react';
import { Cpu, Code2, Server, Database, GitBranch, Terminal, Layers, Cloud, Flame, Webhook, Box, Palette, FileCode, Layout } from 'lucide-react';
import { Figma } from './SocialIcons';
import { skillsData } from '../data/portfolioData';

// Dynamic Icon Renderer
const IconRenderer = ({ iconName }) => {
  const iconMap = {
    Code2: <Code2 size={16} />,
    FileCode: <FileCode size={16} />,
    Palette: <Palette size={16} />,
    Layers: <Layers size={16} />,
    Server: <Server size={16} />,
    Webhook: <Webhook size={16} />,
    Database: <Database size={16} />,
    Flame: <Flame size={16} />,
    GitBranch: <GitBranch size={16} />,
    Box: <Box size={16} />,
    Cloud: <Cloud size={16} />,
    Figma: <Figma size={16} />,
    Layout: <Layout size={16} />,
    Cpu: <Cpu size={16} />
  };
  return iconMap[iconName] || <Terminal size={16} />;
};

// Category Icon Helper
const CategoryIcon = ({ index }) => {
  if (index === 0) return <Layout size={22} />;
  if (index === 1) return <Server size={22} />;
  return <Cpu size={22} />;
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

        {/* Skills Category Grid */}
        <div className="skills-categories-grid">
          {skillsData.map((categoryGroup, index) => (
            <div key={index} className="glass-card skill-category-card">
              {/* Category Header */}
              <div className="skill-cat-header">
                <div className="skill-cat-icon">
                  <CategoryIcon index={index} />
                </div>
                <div className="skill-cat-info">
                  <h3>{categoryGroup.category}</h3>
                  <span className="skill-cat-tag">{categoryGroup.skills.length} Stack Items</span>
                </div>
              </div>

              {/* Skills Badges Grid */}
              <div className="skills-badges-grid">
                {categoryGroup.skills.map((skill, idx) => (
                  <div key={idx} className="skill-badge-card">
                    <div className="skill-badge-left">
                      <span className="skill-badge-icon">
                        <IconRenderer iconName={skill.icon} />
                      </span>
                      <span className="skill-badge-name">{skill.name}</span>
                    </div>

                    <div className="skill-badge-right">
                      <span className="skill-level-pill">{skill.level}%</span>
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
