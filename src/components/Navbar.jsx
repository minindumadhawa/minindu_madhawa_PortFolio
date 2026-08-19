import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Code, Send } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Section highlight logic
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" className="navbar-logo">
          <div className="logo-icon-wrap">
            <Code size={22} className="logo-icon" />
          </div>
          <span className="logo-text">
            Minindu<span className="gradient-text">.dev</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-desktop">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Actions (Theme Switcher + Hire CTA) */}
        <div className="navbar-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label="Toggle light/dark theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a href="#contact" className="btn btn-primary nav-cta">
            <Send size={16} />
            <span>Hire Me</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle-btn"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-cta">
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: '100%' }}>
              <Send size={18} />
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
