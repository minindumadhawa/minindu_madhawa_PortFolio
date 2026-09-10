import React, { useState } from 'react';
import { Cpu, Code2, Server, Database, GitBranch, Terminal, Layers, Cloud, Flame, Webhook, Box, Palette, FileCode, Layout, Smartphone, Zap, Sparkles, Sliders, Globe } from 'lucide-react';
import { Github, Linkedin, Twitter, Figma } from './SocialIcons';
import { skillsData, personalData } from '../data/portfolioData';
import './Skills.css';

// Dynamic Icon Component Helper
const IconRenderer = ({ iconName, size = 18 }) => {
  const iconMap = {
    Code2: <Code2 size={size} />,
    FileCode: <FileCode size={size} />,
    Palette: <Palette size={size} />,
    Layers: <Layers size={size} />,
    Server: <Server size={size} />,
    Webhook: <Webhook size={size} />,
    Database: <Database size={size} />,
    Flame: <Flame size={size} />,
    GitBranch: <GitBranch size={size} />,
    Box: <Box size={size} />,
    Cloud: <Cloud size={size} />,
    Figma: <Figma size={size} />,
    Layout: <Layout size={size} />,
    Cpu: <Cpu size={size} />,
    Smartphone: <Smartphone size={size} />,
    Zap: <Zap size={size} />
  };
  return iconMap[iconName] || <Terminal size={size} />;
};

// 6 Circuit Skill Nodes mapping (matching the reference diagram layout)
const circuitNodes = [
  {
    id: 'frontend-core',
    title: 'HTML5 & CSS3',
    subtext: 'HTML5, Modern CSS3, Responsive Systems',
    level: 95,
    icon: 'Palette',
    side: 'left',
    pills: ['HTML5', 'CSS3', 'Flex/Grid'],
    pathId: 'path-top-left'
  },
  {
    id: 'javascript-react',
    title: 'JAVASCRIPT & FRONTEND',
    subtext: 'React.js, Next.js, TypeScript, Redux',
    level: 92,
    icon: 'Code2',
    side: 'left',
    pills: ['React.js', 'Next.js', 'TypeScript'],
    pathId: 'path-mid-left'
  },
  {
    id: 'backend-node',
    title: 'BACKEND & APIS',
    subtext: 'Node.js, Express.js, Python, REST APIs',
    level: 88,
    icon: 'Server',
    side: 'left',
    pills: ['Node.js', 'Express', 'APIs'],
    pathId: 'path-bot-left'
  },
  {
    id: 'uiux-design',
    title: 'UI/UX & DESIGN',
    subtext: 'Figma, Visual Systems, Wireframing',
    level: 90,
    icon: 'Figma',
    side: 'right',
    pills: ['Figma', 'UI/UX', 'Prototypes'],
    pathId: 'path-top-right'
  },
  {
    id: 'database-data',
    title: 'DATA & DATABASES',
    subtext: 'MongoDB, PostgreSQL, MySQL, Firebase',
    level: 85,
    icon: 'Database',
    side: 'right',
    pills: ['MongoDB', 'PostgreSQL', 'SQL'],
    pathId: 'path-mid-right'
  },
  {
    id: 'cloud-devops',
    title: 'CLOUD & DEVOPS',
    subtext: 'AWS, Docker, Git, Vercel, CI/CD',
    level: 94,
    icon: 'Cloud',
    side: 'right',
    pills: ['AWS', 'Docker', 'Git/GitHub'],
    pathId: 'path-bot-right'
  }
];

export default function Skills() {
  const [activeNode, setActiveNode] = useState(null);
  const [viewMode, setViewMode] = useState('circuit'); // 'circuit' | 'grid'

  // Circular Gauge Math (Radius = 28)
  const radius = 28;
  const circumference = 2 * Math.PI * radius; // ~175.93

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="badge">
            <Cpu size={16} />
            <span>Tech Stack</span>
          </div>
          <h2>Skills & <span className="gradient-text">Proficiencies</span></h2>
          <p>Technologies, frameworks, and architecture patterns I use to craft digital products.</p>

          {/* View Mode Toggle Switch */}
          <div className="skills-controls-row">
            <button
              className={`skills-view-btn ${viewMode === 'circuit' ? 'active' : ''}`}
              onClick={() => setViewMode('circuit')}
            >
              <Cpu size={15} />
              <span>Circuit Diagram View</span>
            </button>
            <button
              className={`skills-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Sliders size={15} />
              <span>Category Stack View</span>
            </button>
          </div>
        </div>

        {/* CONDITION 1: Futuristic Circuit Diagram View (User Reference Image Design) */}
        {viewMode === 'circuit' && (
          <div className="circuit-canvas-container animate-fade-in">
            {/* Background Ambient Glows */}
            <div className="circuit-bg-glow circuit-glow-1"></div>
            <div className="circuit-bg-glow circuit-glow-2"></div>
            <div className="circuit-bg-glow circuit-glow-center"></div>

            {/* Central Grid Floor Pattern */}
            <div className="central-grid-pattern"></div>

            {/* Central Tech Hub Badge */}
            <div className="central-tech-hub">
              <div className="central-hub-card">
                <span className="central-hub-tag">Core Architecture</span>
                <h3 className="central-hub-title">WEB DEVELOPMENT SKILLS</h3>
                <span className="central-hub-sub">FULL-STACK ENGINE</span>
              </div>
            </div>

            {/* SVG Connecting Circuit Traces Overlay (Desktop Curve Paths) */}
            <svg className="svg-circuit-canvas" viewBox="0 0 1000 580" preserveAspectRatio="none">
              {/* Top Left Path */}
              <path
                className={`circuit-path-bg ${activeNode === 'frontend-core' ? 'circuit-path-active' : ''}`}
                d="M 330 110 C 440 110, 440 260, 500 290"
              />
              <path
                className="circuit-path-pulse"
                d="M 330 110 C 440 110, 440 260, 500 290"
              />

              {/* Mid Left Path */}
              <path
                className={`circuit-path-bg ${activeNode === 'javascript-react' ? 'circuit-path-active' : ''}`}
                d="M 330 290 C 420 290, 440 290, 500 290"
              />
              <path
                className="circuit-path-pulse"
                d="M 330 290 C 420 290, 440 290, 500 290"
              />

              {/* Bottom Left Path */}
              <path
                className={`circuit-path-bg ${activeNode === 'backend-node' ? 'circuit-path-active' : ''}`}
                d="M 330 470 C 440 470, 440 320, 500 290"
              />
              <path
                className="circuit-path-pulse"
                d="M 330 470 C 440 470, 440 320, 500 290"
              />

              {/* Top Right Path */}
              <path
                className={`circuit-path-bg ${activeNode === 'uiux-design' ? 'circuit-path-active' : ''}`}
                d="M 670 110 C 560 110, 560 260, 500 290"
              />
              <path
                className="circuit-path-pulse"
                d="M 670 110 C 560 110, 560 260, 500 290"
              />

              {/* Mid Right Path */}
              <path
                className={`circuit-path-bg ${activeNode === 'database-data' ? 'circuit-path-active' : ''}`}
                d="M 670 290 C 580 290, 560 290, 500 290"
              />
              <path
                className="circuit-path-pulse"
                d="M 670 290 C 580 290, 560 290, 500 290"
              />

              {/* Bottom Right Path */}
              <path
                className={`circuit-path-bg ${activeNode === 'cloud-devops' ? 'circuit-path-active' : ''}`}
                d="M 670 470 C 560 470, 560 320, 500 290"
              />
              <path
                className="circuit-path-pulse"
                d="M 670 470 C 560 470, 560 320, 500 290"
              />
            </svg>

            {/* Nodes Layout Grid (3 Left Column, 3 Right Column) */}
            <div className="circuit-nodes-grid">
              {/* Left Column Nodes */}
              <div className="circuit-column left">
                {circuitNodes.filter(n => n.side === 'left').map((node) => {
                  const strokeOffset = circumference - (circumference * node.level) / 100;
                  const isHovered = activeNode === node.id;

                  return (
                    <div
                      key={node.id}
                      className={`skill-node-card ${isHovered ? 'active' : ''}`}
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      {/* Circular Gauge Ring Meter */}
                      <div className="node-circle-meter">
                        <svg className="circle-svg" viewBox="0 0 64 64">
                          <circle className="circle-bg" cx="32" cy="32" r={radius} />
                          <circle
                            className="circle-progress"
                            cx="32"
                            cy="32"
                            r={radius}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeOffset}
                          />
                        </svg>
                        <div className="node-center-content">
                          <span className="node-percent">{node.level}%</span>
                        </div>
                      </div>

                      {/* Node Text & Tech Stack Pills */}
                      <div className="node-details">
                        <h4 className="node-title">{node.title}</h4>
                        <span className="node-subtext">{node.subtext}</span>
                        <div className="node-tech-pills">
                          {node.pills.map((pill, idx) => (
                            <span key={idx} className="mini-tech-pill">{pill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column Nodes */}
              <div className="circuit-column right">
                {circuitNodes.filter(n => n.side === 'right').map((node) => {
                  const strokeOffset = circumference - (circumference * node.level) / 100;
                  const isHovered = activeNode === node.id;

                  return (
                    <div
                      key={node.id}
                      className={`skill-node-card ${isHovered ? 'active' : ''}`}
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      {/* Circular Gauge Ring Meter */}
                      <div className="node-circle-meter">
                        <svg className="circle-svg" viewBox="0 0 64 64">
                          <circle className="circle-bg" cx="32" cy="32" r={radius} />
                          <circle
                            className="circle-progress"
                            cx="32"
                            cy="32"
                            r={radius}
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeOffset}
                          />
                        </svg>
                        <div className="node-center-content">
                          <span className="node-percent">{node.level}%</span>
                        </div>
                      </div>

                      {/* Node Text & Tech Stack Pills */}
                      <div className="node-details">
                        <h4 className="node-title">{node.title}</h4>
                        <span className="node-subtext">{node.subtext}</span>
                        <div className="node-tech-pills">
                          {node.pills.map((pill, idx) => (
                            <span key={idx} className="mini-tech-pill">{pill}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Floating Social Pill Dock (Matching Reference Image) */}
            <div className="circuit-bottom-dock">
              <div className="dock-glass-pill">
                <a href={personalData.socials.github} target="_blank" rel="noopener noreferrer" className="dock-link" title="GitHub">
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a href={personalData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="dock-link" title="LinkedIn">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a href={personalData.socials.twitter} target="_blank" rel="noopener noreferrer" className="dock-link" title="Twitter">
                  <Twitter size={18} />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* CONDITION 2: Traditional Category Grid Stack View */}
        {viewMode === 'grid' && (
          <div className="skills-categories-grid animate-fade-in">
            {skillsData.map((categoryGroup, index) => (
              <div key={index} className="glass-card skill-category-card">
                {/* Category Header */}
                <div className="skill-cat-header">
                  <div className="skill-cat-icon">
                    <Cpu size={22} />
                  </div>
                  <div className="skill-cat-info">
                    <h3>{categoryGroup.category}</h3>
                    <span className="skill-cat-tag">{categoryGroup.skills.length} Items</span>
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
        )}
      </div>
    </section>
  );
}
