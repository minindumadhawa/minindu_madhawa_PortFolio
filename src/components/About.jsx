import React, { useState } from 'react';
import { User, Code2, Rocket, ShieldCheck, MapPin, Mail, GraduationCap, Globe, Copy, Check, ArrowRight } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function About() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlights = [
    {
      icon: <Code2 size={22} className="highlight-icon" />,
      title: "Clean Modular Architecture",
      description: "Writing scalable, maintainable, and well-documented JavaScript & TypeScript codebases."
    },
    {
      icon: <Rocket size={22} className="highlight-icon" />,
      title: "High Performance & Speed",
      description: "Optimizing Core Web Vitals, bundle size, server rendering, and database query latency."
    },
    {
      icon: <ShieldCheck size={22} className="highlight-icon" />,
      title: "UI/UX Craftsmanship",
      description: "Building mobile-first, pixel-perfect user interfaces with intuitive micro-interactions."
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
            <div className="story-card-header">
              <h3 className="story-title">Engineering Narrative</h3>
              <span className="story-tag">Full-Stack Engineer</span>
            </div>

            <p className="story-text">
              I am a dedicated <strong>Software Engineer</strong> based in {personalData.location}, deeply engaged in full-stack web development and user interface design.
            </p>
            <p className="story-text">
              My core mission is to solve real-world problems by building robust backend architectures and engaging frontend applications. I thrive in dynamic team environments, continuously experimenting with emerging frameworks and industry best practices.
            </p>

            {/* Key Quick Info Grid - Mobile Responsive */}
            <div className="about-info-grid">
              <div className="info-item">
                <div className="info-icon-box">
                  <MapPin size={16} />
                </div>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-val">{personalData.location}</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Mail size={16} />
                </div>
                <div className="info-content">
                  <span className="info-label">Email</span>
                  <span className="info-val info-email" title={personalData.email}>
                    {personalData.email}
                  </span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <GraduationCap size={16} />
                </div>
                <div className="info-content">
                  <span className="info-label">Degree</span>
                  <span className="info-val">B.Sc. Information Technology</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon-box">
                  <Globe size={16} />
                </div>
                <div className="info-content">
                  <span className="info-label">Languages</span>
                  <span className="info-val">English, Sinhala</span>
                </div>
              </div>
            </div>

            {/* Mobile Quick Action Strip */}
            <div className="about-actions-strip">
              <button onClick={handleCopyEmail} className="btn btn-secondary about-copy-btn">
                {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
                <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
              </button>
              <a href="#contact" className="btn btn-primary about-cta-btn">
                <span>Let's Talk</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Highlights Cards Column */}
          <div className="about-highlights-col">
            {highlights.map((item, idx) => (
              <div key={idx} className="glass-card highlight-card">
                <div className="highlight-icon-box">{item.icon}</div>
                <div className="highlight-content">
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
