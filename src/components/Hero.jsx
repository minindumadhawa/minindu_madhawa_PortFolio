import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Mail, Sparkles, CheckCircle2, Move, Cpu, QrCode, Code2, Terminal, Globe, Layers, Zap, ShieldCheck, Award, BadgeCheck } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import { personalData } from '../data/portfolioData';

// Geometric Pattern Component for the ID Card Back
const GeometricPattern = () => (
  <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
    <defs>
      <pattern id="geo-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <rect width="60" height="60" fill="#F4F1EC"/>
        <path d="M30 0L60 30L30 60L0 30Z" fill="#D56A2B" />
        <path d="M30 6L54 30L30 54L6 30Z" fill="#973215" />
        <path d="M30 12L48 30L30 48L12 30Z" fill="#E69C24" />
        <path d="M30 18L33.5 26.5L42 30L33.5 33.5L30 42L26.5 33.5L18 30L26.5 26.5Z" fill="#521B0A" />
        <circle cx="30" cy="30" r="4" fill="#F4F1EC" />
        
        {/* Corners */}
        <path d="M0 0 L15 0 L0 15 Z" fill="#D56A2B"/>
        <path d="M60 0 L45 0 L60 15 Z" fill="#D56A2B"/>
        <path d="M0 60 L15 60 L0 45 Z" fill="#D56A2B"/>
        <path d="M60 60 L45 60 L60 45 Z" fill="#D56A2B"/>

        <path d="M0 0 L10 0 L0 10 Z" fill="#973215"/>
        <path d="M60 0 L50 0 L60 10 Z" fill="#973215"/>
        <path d="M0 60 L10 60 L0 50 Z" fill="#973215"/>
        <path d="M60 60 L50 60 L60 50 Z" fill="#973215"/>

        <path d="M30 0 L38 0 L30 8 L22 0 Z" fill="#F4F1EC"/>
        <path d="M30 60 L38 60 L30 52 L22 60 Z" fill="#F4F1EC"/>
        <path d="M0 30 L0 22 L8 30 L0 38 Z" fill="#F4F1EC"/>
        <path d="M60 30 L60 22 L52 30 L60 38 Z" fill="#F4F1EC"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#geo-pattern)" />
  </svg>
);

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);

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

  // Cancel spring animation if active
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
      if (e.cancelable) {
        e.preventDefault();
      }
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
      
      const draggedX = posRef.current.x;
      // If dragged far enough, complete a full 360 rotation to land back on the front
      if (draggedX > 150) {
        setSpinRotation(prev => prev + 360);
        setIsFlipped(false);
      } else if (draggedX < -150) {
        setSpinRotation(prev => prev - 360);
        setIsFlipped(false);
      }

      triggerSpringPhysicsReturn(posRef.current.x, posRef.current.y);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
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
                <ArrowRight size={16} className="btn-arrow-icon" />
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span>Contact Me</span>
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

          {/* Right Column: Classic Vintage Hanging Identity Pass Card */}
          <div className="hero-idcard-wrapper">
            {/* Dynamic Flexible SVG Lanyard Ribbon Canvas */}
            <svg className="svg-lanyard-canvas" viewBox="0 -160 320 600">
              <defs>
                <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#835B40" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#A47453" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#6E4932" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F5D77F" />
                  <stop offset="35%" stopColor="#D4AF37" />
                  <stop offset="70%" stopColor="#AA7C11" />
                  <stop offset="100%" stopColor="#6A4E0B" />
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
                stroke="rgba(131, 91, 64, 0.35)"
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

              {/* Classic Stitching pattern line */}
              <path
                d={lanyardCurvePath}
                fill="none"
                stroke="rgba(245, 239, 230, 0.6)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                strokeLinecap="round"
              />

              {/* Brass Vintage Clip Hook attached to top hole */}
              <g
                style={{
                  transform: `translate3d(${dragOffset.x}px, ${dragOffset.y - 12}px, 0)`,
                  transformOrigin: '160px 0px'
                }}
              >
                <rect x="150" y="-12" width="20" height="12" rx="3" fill="url(#brassGradient)" stroke="#4A3508" strokeWidth="1" />
                <path d="M 153 0 L 167 0 L 164 14 A 4 4 0 0 1 156 14 Z" fill="url(#brassGradient)" stroke="#3A2805" strokeWidth="1.2" />
                <circle cx="160" cy="12" r="5.5" fill="none" stroke="url(#brassGradient)" strokeWidth="2.5" />
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

            {/* Hanging Vintage Identity Pass Card attached to Lanyard */}
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

              {/* Redesigned Classic Vintage Pass Card - 3D Scene */}
              <div className="classic-vintage-id-card-scene">
                <div 
                  className="classic-vintage-id-card-inner"
                  style={{
                    transform: `rotateX(${isDragging ? -dragOffset.y * 0.15 : 0}deg) rotateY(${(isFlipped ? 180 : 0) + spinRotation + (isDragging ? dragOffset.x * 0.6 : 0)}deg)`,
                    transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                >
                  
                  {/* Front Face */}
                  <div className="classic-vintage-id-card classic-vintage-id-card-front" onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}>
                    
                    {/* Metallic Brass Eyelet Hole Header */}
                    <div className="classic-card-eyelet-wrap">
                      <div className="classic-brass-eyelet"></div>
                    </div>

                    {/* Classic Header Title & Security Guilloche Line */}
                    <div className="classic-card-header">
                      <div className="classic-header-branding">
                        <Award size={14} className="classic-header-icon" />
                        <span>CREATIVE IDENTITY PASS</span>
                      </div>
                      <span className="classic-edition-tag">EST. 2026</span>
                    </div>

                    <div className="classic-guilloche-divider"></div>

                    {/* Inner Photo Frame & Rubber Stamp Overlay */}
                    <div className="classic-photo-wrapper">
                      <div className="classic-photo-frame">
                        <img src="/minindu_profile.jpg" alt={personalData.name} className="classic-avatar-img" draggable="false" />
                        <div className="classic-photo-vignette"></div>
                      </div>
                      
                      {/* Vintage Rubber Stamp Overlay */}
                      <div className="classic-rubber-stamp">
                        <BadgeCheck size={14} />
                        <span>VERIFIED</span>
                      </div>

                      {/* Active Status Ribbon Pill */}
                      <div className="classic-status-pill">
                        <span className="classic-status-dot"></span>
                        <span>ACTIVE PASS</span>
                      </div>
                    </div>

                    {/* Detailed Card Info Section */}
                    <div className="classic-card-details">
                      <div className="classic-card-user-info">
                        <h3 className="classic-card-name">{personalData.name}</h3>
                        <p className="classic-card-role">Full-Stack Engineer & Architect</p>
                      </div>

                      <div className="classic-card-meta-row">
                        <div className="classic-meta-col">
                          <span className="classic-meta-label">PASS SERIAL NO.</span>
                          <span className="classic-meta-val">#MM-9407-PASS</span>
                        </div>
                        <div className="classic-meta-col text-right">
                          <span className="classic-meta-label">SECURITY CODE</span>
                          <span className="classic-meta-val">AUTHENTIC</span>
                        </div>
                      </div>

                      <div className="classic-barcode-footer">
                        <div className="classic-barcode-lines">
                          <span className="bar b-wide"></span><span className="bar b-narrow"></span><span className="bar b-med"></span>
                          <span className="bar b-wide"></span><span className="bar b-thin"></span><span className="bar b-wide"></span>
                          <span className="bar b-med"></span><span className="bar b-thin"></span><span className="bar b-wide"></span>
                          <span className="bar b-narrow"></span><span className="bar b-wide"></span><span className="bar b-med"></span>
                          <span className="bar b-thin"></span><span className="bar b-wide"></span><span className="bar b-narrow"></span>
                        </div>
                        <div className="classic-qr-box" title="Click to Flip" onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }} style={{cursor: 'pointer'}}>
                          <QrCode size={24} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div className="classic-vintage-id-card classic-vintage-id-card-back" onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                    
                    {/* Top Pattern Border */}
                    <div className="idcard-pattern-top">
                      <GeometricPattern />
                    </div>

                    {/* Center Details */}
                    <div className="idcard-back-center-content">
                      <div style={{ marginBottom: '10px', padding: '6px', background: '#fff', borderRadius: '8px', border: '1px solid #d56a2b' }}>
                        <QrCode size={54} color="#521B0A" />
                      </div>
                      <h4 className="back-auth-title">AUTHORIZED PERSONNEL</h4>
                      <p className="back-auth-desc">
                        This pass is the property of <strong>{personalData.name}</strong>. It grants full access to advanced web architecture, backend infrastructure, and frontend UI/UX domains.
                      </p>
                      <div className="back-contact-info">
                        <Mail size={12} />
                        <span>{personalData.socials.email || "minindu.madhawa@example.com"}</span>
                      </div>
                    </div>

                    {/* Bottom Pattern Border */}
                    <div className="idcard-pattern-bottom">
                      <GeometricPattern />
                    </div>

                    {/* Flip hint */}
                    <div className="classic-flip-hint-absolute" style={{ bottom: '15px', right: '15px' }} onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}>
                      <Move size={14} />
                    </div>
                    
                    {/* Eyelet hole cover to show through from back correctly */}
                    <div className="classic-card-eyelet-wrap-back">
                      <div className="classic-brass-eyelet"></div>
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
