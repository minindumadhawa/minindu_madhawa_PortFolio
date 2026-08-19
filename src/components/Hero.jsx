import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Download, Sparkles, CheckCircle2 } from 'lucide-react';
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
                // If standard placeholder, trigger notification
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

        {/* Right Column: Avatar Glow Frame */}
        <div className="hero-avatar-wrapper">
          <div className="avatar-glow-ring"></div>
          <div className="avatar-image-container">
            <img src={personalData.avatar} alt={personalData.name} className="hero-avatar-img" />
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
