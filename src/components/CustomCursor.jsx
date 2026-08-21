import React, { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState('default');
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Check if device is touch-enabled
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveEl = target.closest(
        'a, button, input, textarea, select, .btn, .glass-card, [role="button"], .interactive, .project-card, .social-icon, .nav-link'
      );

      if (interactiveEl) {
        setIsHovered(true);
        if (interactiveEl.tagName === 'A' || interactiveEl.classList.contains('btn') || interactiveEl.classList.contains('nav-link')) {
          setHoverType('link');
        } else if (interactiveEl.tagName === 'BUTTON') {
          setHoverType('button');
        } else if (interactiveEl.classList.contains('glass-card') || interactiveEl.classList.contains('project-card')) {
          setHoverType('card');
        } else {
          setHoverType('default');
        }
      } else {
        setIsHovered(false);
        setHoverType('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // RAF Loop for ultra smooth Lerp trailing animation
    const animate = () => {
      const ease = 0.18; // smooth trailing speed
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''} ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'visible' : ''} ${isHovered ? `hovered hover-${hoverType}` : ''} ${isClicked ? 'clicked' : ''}`}
      />
    </>
  );
}
