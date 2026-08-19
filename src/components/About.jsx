import React from 'react';
import { User, Code2, Rocket, ShieldCheck, MapPin, Mail, GraduationCap, Globe } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function About() {
  const highlights = [
    {
      icon: <Code2 size={24} className="highlight-icon" />,
      title: "Clean Modular Code",
      description: "Writing scalable, maintainable, and well-documented JavaScript & TypeScript codebases."
    },
    {
      icon: <Rocket size={24} className="highlight-icon" />,
      title: "High Performance",
      description: "Optimizing Web Vitals, dynamic bundling, server rendering, and database query response times."
    },
    {
      icon: <ShieldCheck size={24} className="highlight-icon" />,
      title: "UI/UX Craftsmanship",
      description: "Building responsive, accessible, pixel-perfect user interfaces with sleek micro-interactions."
    }
  ];

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <User size={16} />
            <span>About Me</span>
          </div>
          <h2>Transforming Complex Ideas Into <span className="gradient-text">Elegant Code</span></h2>
          <p>Passionate about crafting fast, accessible, and human-centric web applications.</p>
        </div>

        <div className="about-grid">
          {/* Bio Story Card */}
          <div className="glass-card about-story-card">
            <h3 className="story-title">Engineering Narrative</h3>
            <p className="story-text">
              I am a dedicated <strong>Software Engineer</strong> based in {personalData.location}, deeply engaged with full-stack web development and user interface design. 
            </p>
            <p className="story-text">
              My core mission is to solve real-world problems by building robust backend architectures and engaging frontend applications. I thrive in dynamic team environments, continuously experimenting with emerging frameworks and best practices.
            </p>

            {/* Key Quick Info */}
            <div className="about-info-grid">
              <div className="info-item">
                <MapPin size={18} className="info-icon" />
                <div>
                  <span className="info-label">Location:</span>
                  <span className="info-val">{personalData.location}</span>
                </div>
              </div>

              <div className="info-item">
                <Mail size={18} className="info-icon" />
                <div>
                  <span className="info-label">Email:</span>
                  <span className="info-val">{personalData.email}</span>
                </div>
              </div>

              <div className="info-item">
                <GraduationCap size={18} className="info-icon" />
                <div>
                  <span className="info-label">Degree:</span>
                  <span className="info-val">B.Sc. Software Engineering</span>
                </div>
              </div>

              <div className="info-item">
                <Globe size={18} className="info-icon" />
                <div>
                  <span className="info-label">Languages:</span>
                  <span className="info-val">English, Sinhala</span>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights Cards Column */}
          <div className="about-highlights-col">
            {highlights.map((item, idx) => (
              <div key={idx} className="glass-card highlight-card">
                <div className="highlight-icon-box">{item.icon}</div>
                <div>
                  <h4 className="highlight-card-title">{item.title}</h4>
                  <p className="highlight-card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
