import React from 'react';
import { Lock, RotateCw, ChevronLeft, ChevronRight, Globe } from 'lucide-react';

export default function DesktopMockup({ 
  image, 
  title, 
  demoUrl = '#', 
  category, 
  onViewDetails, 
  isModal = false,
  children 
}) {
  // Format display URL for the desktop mockup address bar
  const getDisplayUrl = (url) => {
    if (!url || url === '#') return 'https://localhost:3000';
    try {
      const parsed = new URL(url);
      if (parsed.hostname === 'example.com') {
        const path = parsed.pathname.replace(/^\//, '');
        return `https://${path || 'project'}.app`;
      }
      return `${parsed.protocol}//${parsed.hostname}${parsed.pathname === '/' ? '' : parsed.pathname}`;
    } catch {
      return url.startsWith('http') ? url : `https://${url}`;
    }
  };

  const formattedUrl = getDisplayUrl(demoUrl);

  return (
    <div className={`desktop-mockup-container ${isModal ? 'is-modal-mockup' : 'is-card-mockup'}`}>
      {/* Desktop Window Frame */}
      <div className="desktop-window-frame">
        {/* Top Window Bar / macOS Browser Chrome */}
        <div className="desktop-window-header">
          {/* Traffic Lights */}
          <div className="window-dots">
            <span className="dot dot-close" title="Close"></span>
            <span className="dot dot-minimize" title="Minimize"></span>
            <span className="dot dot-maximize" title="Maximize"></span>
          </div>

          {/* Navigation & Controls */}
          <div className="window-nav-btns">
            <button className="nav-icon-btn" disabled aria-label="Back">
              <ChevronLeft size={13} />
            </button>
            <button className="nav-icon-btn" disabled aria-label="Forward">
              <ChevronRight size={13} />
            </button>
            <button className="nav-icon-btn" aria-label="Reload">
              <RotateCw size={11} />
            </button>
          </div>

          {/* Address / URL Bar */}
          <div className="window-url-bar">
            <Lock size={11} className="url-lock-icon" />
            <span className="url-text">{formattedUrl}</span>
          </div>

          {/* Window Extra Action / Title */}
          <div className="window-actions">
            <Globe size={13} className="window-globe-icon" />
          </div>
        </div>

        {/* Desktop Screen Container */}
        <div className="desktop-screen">
          <img src={image} alt={title} className="desktop-screen-img" />
          
          {/* Subtle Glare overlay */}
          <div className="desktop-screen-glare"></div>

          {/* Category Badge overlay if present */}
          {category && !isModal && (
            <div className="desktop-category-badge">{category}</div>
          )}

          {/* Custom Overlay Children */}
          {children}
        </div>
      </div>

      {/* Monitor Stand Base */}
      <div className="desktop-stand-base">
        <div className="desktop-stand-neck"></div>
        <div className="desktop-stand-foot"></div>
      </div>
    </div>
  );
}
