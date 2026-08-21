import React, { useEffect, useState } from 'react';
import { Code2 } from 'lucide-react';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusText, setStatusText] = useState('Initializing workspace...');

  useEffect(() => {
    const duration = 1600; // 1.6 seconds total
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;

        if (next >= 30 && next < 70) {
          setStatusText('Loading components & assets...');
        } else if (next >= 70 && next < 99) {
          setStatusText('Preparing interactive experience...');
        } else if (next >= 100) {
          setStatusText('Welcome!');
          clearInterval(timer);
          
          // Trigger exit animation phase after short pause
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600); // match CSS exit animation duration
          }, 300);

          return 100;
        }

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`preloader-overlay ${isExiting ? 'preloader-exit' : ''}`}>
      <div className="preloader-content">
        {/* Animated Brand Emblem */}
        <div className="preloader-logo-wrap">
          <div className="preloader-logo-glow"></div>
          <div className="preloader-logo-box">
            <Code2 size={32} className="preloader-icon" />
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="preloader-title">
          MININDU <span className="gradient-text">MADHAWA</span>
        </h2>

        {/* Progress Bar Container */}
        <div className="preloader-progress-track">
          <div 
            className="preloader-progress-fill" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Bottom Meta Row */}
        <div className="preloader-meta">
          <span className="preloader-status">{statusText}</span>
          <span className="preloader-percentage">{Math.floor(Math.min(progress, 100))}%</span>
        </div>
      </div>
    </div>
  );
}
