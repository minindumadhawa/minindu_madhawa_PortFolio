import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Download, Sparkles, CheckCircle2, Cpu, QrCode } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const fullText = personalData.roles[currentRoleIndex];
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayedText === fullText) {
      typingSpeed = 2200; // Pause at end of word
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % personalData.roles.length);
      typingSpeed = 400;
    }

    const timer = setTimeout(() => {
      setDisplayedText((prev) => {
        if (!isDeleting) {
          if (prev.length < fullText.length) {
            return fullText.slice(0, prev.length + 1);
          }
          setIsDeleting(true);
          return prev;
        } else {
          return fullText.slice(0, prev.length - 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  return (
    <section id="hero" className="section hero-section">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="container hero-container">
        {/* Left Column: Text & CTAs */}
        <div className="hero-content">
          <div className="badge hero-badge">
            <Sparkles size={16} />
            <span>Available for New Projects</span>
          </div>

          <h1 className="hero-title">
            Hello, I'm <br />
            <span className="gradient-text">{personalData.name}</span>
          </h1>

          <div className="hero-typewriter">
            <span className="typewriter-prefix">I am a </span>
            <span className="typewriter-text">{displayedText}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          <p className="hero-bio">{personalData.bio}</p>

          {/* Action Buttons */}
          <div className="hero-ctas">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              <span>Contact Me</span>
            </a>
            <a 
              href={personalData.resumeUrl} 
              className="btn btn-secondary download-cv-btn"
              onClick={(e) => {
                if (personalData.resumeUrl === '#') {
                  e.preventDefault();
                  alert('Resume download triggered! Replace resumeUrl in src/data/portfolioData.js with your PDF link.');
                }
              }}
            >
              <Download size={18} />
              <span>Resume</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="hero-socials">
            <span className="socials-label">Connect:</span>
            <a href={personalData.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
              <Github size={20} />
            </a>
            <a href={personalData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={personalData.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Twitter">
              <Twitter size={20} />
            </a>
            <a href={personalData.socials.email} className="social-icon-btn" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Right Column: Hanging Glassmorphic ID Card Badge */}
        <div className="hero-idcard-wrapper">
          {/* Lanyard Strap hanging down from top */}
          <div className="lanyard-strap"></div>
          <div className="lanyard-clip"></div>

          {/* Hanging ID Card Container */}
          <div className="idcard-container animate-swing">
            <div className="idcard-hole"></div>

            {/* Top Security Header */}
            <div className="idcard-header">
              <div className="idcard-logo-tag">
                <Cpu size={14} className="idcard-cpu-icon" />
                <span>DEV.PASS // 2026</span>
              </div>
              <div className="idcard-chip"></div>
            </div>

            {/* Photo Section */}
            <div className="idcard-photo-wrapper">
              <img src="/minindu_profile.jpg" alt={personalData.name} className="idcard-photo-img" />
              <div className="idcard-status-pill">
                <span className="idcard-status-dot"></span>
                <span>ACTIVE</span>
              </div>
            </div>

            {/* ID Card Content */}
            <div className="idcard-details">
              <h3 className="idcard-name">{personalData.name}</h3>
              <p className="idcard-title">Full-Stack Software Engineer</p>

              <div className="idcard-footer">
                <div className="idcard-meta">
                  <span className="meta-label">ID NUMBER</span>
                  <span className="meta-val">#MM-9407-DEV</span>
                </div>
                <div className="idcard-qr">
                  <QrCode size={26} />
                </div>
              </div>
            </div>

            {/* Holographic Security Overlay Shine */}
            <div className="idcard-holo-shine"></div>
          </div>

          {/* Floating Pill Badges */}
          <div className="floating-badge badge-top-right">
            <CheckCircle2 size={18} className="badge-icon-green" />
            <div>
              <p className="badge-title">Full Stack</p>
              <p className="badge-subtitle">React & Node</p>
            </div>
          </div>

          <div className="floating-badge badge-bottom-left">
            <div className="badge-stat-num">3+</div>
            <div>
              <p className="badge-title">Years Exp.</p>
              <p className="badge-subtitle">Modern Web</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats Ribbon */}
      <div className="container">
        <div className="hero-stats-grid glass-card">
          {personalData.stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <h3 className="stat-value gradient-text">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
