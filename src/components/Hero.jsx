import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Download, Sparkles, CheckCircle2, Move, Cpu, QrCode, Code2, Terminal, Globe, Layers, Zap, ShieldCheck } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import { personalData } from '../data/portfolioData';

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  // Drag & Real Physics Spring Simulation State
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isSpringing, setIsSpringing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const animFrameRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 0, vy: 0 });
  const heroRef = useRef(null);

  // Mouse spotlight position tracking
  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

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

  // Cancel spring simulation if active
  const cancelSpringAnimation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  // Mouse & Touch Drag Event Handlers
  const handleStart = (clientX, clientY) => {
    cancelSpringAnimation();
    setIsDragging(true);
    setIsSpringing(false);
    setStartPos({
      x: clientX - dragOffset.x,
      y: clientY - dragOffset.y,
    });
    posRef.current = { x: dragOffset.x, y: dragOffset.y };
    velRef.current = { vx: 0, vy: 0 };
  };

  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Real Multi-Bounce Spring Physics Loop (Hooke's Law Oscillation)
  const triggerSpringPhysicsReturn = (initialX, initialY) => {
    cancelSpringAnimation();
    setIsSpringing(true);

    posRef.current = { x: initialX, y: initialY };
    velRef.current = { vx: 0, vy: 0 };

    const stiffness = 0.09; // Spring stiffness
    const damping = 0.74;   // Rubber band friction decay

    const step = () => {
      const fx = -stiffness * posRef.current.x;
      const fy = -stiffness * posRef.current.y;

      velRef.current.vx = (velRef.current.vx + fx) * damping;
      velRef.current.vy = (velRef.current.vy + fy) * damping;

      posRef.current.x += velRef.current.vx;
      posRef.current.y += velRef.current.vy;

      setDragOffset({ x: posRef.current.x, y: posRef.current.y });

      if (
        Math.abs(posRef.current.x) < 0.15 &&
        Math.abs(posRef.current.y) < 0.15 &&
        Math.abs(velRef.current.vx) < 0.15 &&
        Math.abs(velRef.current.vy) < 0.15
      ) {
        setDragOffset({ x: 0, y: 0 });
        setIsSpringing(false);
        cancelSpringAnimation();
      } else {
        animFrameRef.current = requestAnimationFrame(step);
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
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

      posRef.current = { x: newX, y: newY };
      setDragOffset({ x: newX, y: newY });
    };

    const handleEnd = () => {
      if (!isDragging) return;
      setIsDragging(false);
      triggerSpringPhysicsReturn(posRef.current.x, posRef.current.y);
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

  useEffect(() => {
    return () => cancelSpringAnimation();
  }, []);

  // Dynamic SVG Flexible Lanyard Curve Coordinates
  const anchorX = 160;
  const anchorY = -140;
  const cardX = 160 + dragOffset.x;
  const cardY = 15 + dragOffset.y;

  const controlX = anchorX + dragOffset.x * 0.45;
  const controlY = anchorY + (cardY - anchorY) * 0.45 + Math.abs(dragOffset.x) * 0.08;

  const lanyardCurvePath = `M ${anchorX} ${anchorY} Q ${controlX} ${controlY} ${cardX} ${cardY - 10}`;
  const rotationAngle = dragOffset.x * 0.08;

  return (
    <section 
      id="hero" 
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      className="section hero-section"
      style={{
        '--spotlight-x': `${spotlightPos.x}%`,
        '--spotlight-y': `${spotlightPos.y}%`,
      }}
    >
      <div className="hero-spotlight-bg"></div>
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="container hero-container-wrap">
        <div className="hero-container">
          {/* Left Column: Text & CTAs */}
          <div className="hero-content">
            <div className="badge hero-badge">
              <span className="live-radar-dot"></span>
              <Sparkles size={15} />
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

            {/* Interactive Tech Pills */}
            <div className="hero-tech-pills">
              <span className="tech-pill"><Code2 size={13} /> React</span>
              <span className="tech-pill"><Terminal size={13} /> Node.js</span>
              <span className="tech-pill"><Globe size={13} /> Next.js</span>
              <span className="tech-pill"><Layers size={13} /> TypeScript</span>
              <span className="tech-pill"><Cpu size={13} /> Tailwind</span>
            </div>

            {/* Action Buttons */}
            <div className="hero-ctas">
              <a href="#projects" className="btn btn-primary hero-btn-main">
                <span>View Projects</span>
                <ArrowRight size={18} className="btn-arrow-icon" />
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

          {/* Right Column: Hanging Flexible Lanyard Ribbon with White Curved Outer Rectangle Polaroid Card */}
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
              />

              {/* Main flexible ribbon */}
              <path
                d={lanyardCurvePath}
                fill="none"
                stroke="url(#lanyardGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                filter="url(#lanyardGlow)"
              />

              {/* Stitching pattern line */}
              <path
                d={lanyardCurvePath}
                fill="none"
                stroke="rgba(255, 255, 255, 0.5)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />

              {/* Metallic Clip Hook attached directly onto the top hole of the white card */}
              <g
                style={{
                  transform: `translate3d(${dragOffset.x}px, ${dragOffset.y - 12}px, 0)`,
                  transformOrigin: '160px 0px'
                }}
              >
                <rect x="150" y="-12" width="20" height="12" rx="3" fill="url(#metalGradient)" stroke="#374151" strokeWidth="1" />
                <path d="M 153 0 L 167 0 L 164 14 A 4 4 0 0 1 156 14 Z" fill="url(#metalGradient)" stroke="#1f2937" strokeWidth="1.2" />
                <circle cx="160" cy="12" r="5" fill="none" stroke="#d1d5db" strokeWidth="2.5" />
              </g>
            </svg>

            {/* Drag Tooltip */}
            <div 
              className={`drag-hint-pill ${isDragging ? 'dragging' : ''}`}
              style={{
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y - 45}px, 0)`
              }}
            >
              <Move size={13} />
              <span>{isDragging ? 'Dragging...' : 'Pull & Drag Me!'}</span>
            </div>

            {/* Hanging White Curved Outer Rectangle Polaroid Card attached to Lanyard */}
            <div 
              className={`hanging-avatar-container ${isDragging || isSpringing ? 'is-dragging' : 'animate-swing'}`}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              style={{
                transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotationAngle}deg)`,
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
            >
              <div className="avatar-glow-ring"></div>

              {/* Double Layered White Curved Outer Rectangle Pass Card */}
              <div className="white-curved-outer-card">
                <div className="white-card-hole"></div>

                {/* Pass Header Tag */}
                <div className="white-card-header">
                  <div className="white-card-pass-tag">
                    <Cpu size={13} className="white-card-cpu-icon" />
                    <span>DEV.PASS // 2026</span>
                  </div>
                  <div className="white-card-chip"></div>
                </div>

                {/* Inner Photo Frame */}
                <div className="avatar-image-container">
                  <img src="/minindu_profile.jpg" alt={personalData.name} className="hero-avatar-img" draggable="false" />
                  
                  {/* Active Status Badge */}
                  <div className="avatar-status-pill">
                    <span className="avatar-status-dot"></span>
                    <span>ACTIVE</span>
                  </div>
                </div>

                {/* Detailed Card Info Section */}
                <div className="white-card-details">
                  <div className="white-card-user-info">
                    <h3 className="white-card-name">{personalData.name}</h3>
                    <p className="white-card-role">Full-Stack Software Engineer</p>
                  </div>

                  <div className="white-card-meta-row">
                    <div className="white-meta-col">
                      <span className="white-meta-label">ID NO</span>
                      <span className="white-meta-val">#MM-9407</span>
                    </div>
                    <div className="white-meta-col">
                      <span className="white-meta-label">PASS CODE</span>
                      <span className="white-meta-val">PASS-8820</span>
                    </div>
                    <div className="white-card-qr" title="Security Verification Barcode">
                      <QrCode size={24} />
                    </div>
                  </div>
                </div>
              </div>
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

        {/* Hero Bottom Live Impact Metrics Banner */}
        <div className="hero-metrics-bar glass-card">
          <div className="metric-item">
            <div className="metric-icon-wrap"><Zap size={20} /></div>
            <div>
              <h4 className="metric-number gradient-text">15+</h4>
              <p className="metric-label">Projects Completed</p>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <div className="metric-icon-wrap"><ShieldCheck size={20} /></div>
            <div>
              <h4 className="metric-number gradient-text">100%</h4>
              <p className="metric-label">Clean Code Quality</p>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <div className="metric-icon-wrap"><Cpu size={20} /></div>
            <div>
              <h4 className="metric-number gradient-text">3+ Yrs</h4>
              <p className="metric-label">Engineering Exp.</p>
            </div>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <div className="metric-icon-wrap"><Globe size={20} /></div>
            <div>
              <h4 className="metric-number gradient-text">Global</h4>
              <p className="metric-label">Remote Ready</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
