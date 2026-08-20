import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Download, Sparkles, CheckCircle2, Cpu, QrCode, Move } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Drag Physics State
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

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

  // Mouse & Touch Drag Event Handlers
  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    setStartPos({
      x: clientX - dragOffset.x,
      y: clientY - dragOffset.y,
    });
  };

  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    const handleMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

      let newX = clientX - startPos.x;
      let newY = clientY - startPos.y;

      // Wide bounds allowing full drag across left side of Hero section
      newX = Math.max(-750, Math.min(350, newX));
      newY = Math.max(-100, Math.min(280, newY));

      setDragOffset({ x: newX, y: newY });
    };

    const handleEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      // Spring bounce back to original position
      setDragOffset({ x: 0, y: 0 });
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, startPos]);

  // Dynamic SVG Flexible Lanyard Curve Coordinates
  // Top Fixed Anchor: (160, -140)
  // ID Card Slot Hole exact attachment point: (160 + dragOffset.x, 26 + dragOffset.y)
  const anchorX = 160;
  const anchorY = -140;
  const cardX = 160 + dragOffset.x;
  const cardY = 26 + dragOffset.y;

  // Natural physics curve control point
  const controlX = anchorX + dragOffset.x * 0.45;
  const controlY = anchorY + (cardY - anchorY) * 0.45 + Math.abs(dragOffset.x) * 0.08;

  const lanyardCurvePath = `M ${anchorX} ${anchorY} Q ${controlX} ${controlY} ${cardX} ${cardY - 12}`;
  const rotationAngle = dragOffset.x * 0.08;

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

        {/* Right Column: Interactive Drag & Spring ID Badge with Flexible Connected Rope */}
        <div className="hero-idcard-wrapper">
          {/* Dynamic Flexible SVG Lanyard Ribbon Canvas */}
          <svg className="svg-lanyard-canvas" viewBox="0 -160 320 600">
            <defs>
              <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0076DF" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#00c6ff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0076DF" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3f4f6" />
                <stop offset="50%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
              <filter id="lanyardGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing outer aura */}
            <path
              d={lanyardCurvePath}
              fill="none"
              stroke="rgba(0, 118, 223, 0.45)"
              strokeWidth="14"
              strokeLinecap="round"
              style={{
                transition: isDragging ? 'none' : 'd 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.35)'
              }}
            />

            {/* Main flexible ribbon */}
            <path
              d={lanyardCurvePath}
              fill="none"
              stroke="url(#lanyardGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#lanyardGlow)"
              style={{
                transition: isDragging ? 'none' : 'd 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.35)'
              }}
            />

            {/* Stitching pattern line */}
            <path
              d={lanyardCurvePath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
              style={{
                transition: isDragging ? 'none' : 'd 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.35)'
              }}
            />

            {/* Metallic Clip Hook attached directly into the card hole slot */}
            <g
              style={{
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
                transition: isDragging ? 'none' : 'transform 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.35)',
                transformOrigin: '160px 26px'
              }}
            >
              {/* Metallic Crimper Band */}
              <rect x="150" y="-2" width="20" height="12" rx="3" fill="url(#metalGradient)" stroke="#374151" strokeWidth="1" />
              {/* Swivel Loop Hook passing into slot */}
              <path d="M 153 10 L 167 10 L 164 24 A 4 4 0 0 1 156 24 Z" fill="url(#metalGradient)" stroke="#1f2937" strokeWidth="1.2" />
              {/* Ring Hole Clip Loop */}
              <circle cx="160" cy="22" r="5" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
            </g>
          </svg>

          {/* Pull Me Tooltip */}
          <div 
            className={`drag-hint-pill ${isDragging ? 'dragging' : ''}`}
            style={{
              transform: `translate3d(${dragOffset.x}px, ${dragOffset.y - 35}px, 0)`,
              transition: isDragging ? 'none' : 'transform 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.35)'
            }}
          >
            <Move size={13} />
            <span>{isDragging ? 'Dragging Left/Right...' : 'Pull & Drag Me All Around!'}</span>
          </div>

          {/* Interactive Hanging ID Card Container */}
          <div 
            className={`idcard-container ${isDragging ? 'is-dragging' : 'animate-swing'}`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
              transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotationAngle}deg)`,
              transition: isDragging ? 'none' : 'transform 0.75s cubic-bezier(0.175, 0.885, 0.32, 1.35)',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
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
              <img src="/minindu_profile.jpg" alt={personalData.name} className="idcard-photo-img" draggable="false" />
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
