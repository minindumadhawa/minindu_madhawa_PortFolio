import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Code, Send } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Navbar({ theme, toggleTheme, currentPage, navigateToHome, navigateToAllProjects }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Home', href: '#hero', section: 'hero' },
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Skills', href: '#skills', section: 'skills' },
    { name: 'Projects', href: '#projects', section: 'projects' },
    { name: 'Experience', href: '#experience', section: 'experience' },
    { name: 'Services', href: '#services', section: 'services' },
    { name: 'Contact', href: '#contact', section: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (currentPage === 'home') {
        const sections = navLinks.map(link => link.section);
        const scrollPos = window.scrollY + 200;

        for (let i = sections.length - 1; i >= 0; i--) {
          const elem = document.getElementById(sections[i]);
          if (elem && elem.offsetTop <= scrollPos) {
            setActiveSection(sections[i]);
            break;
          }
        }
      } else {
        setActiveSection('projects');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (link.section === 'projects') {
      if (navigateToAllProjects) navigateToAllProjects();
    } else if (currentPage !== 'home') {
      if (navigateToHome) navigateToHome(link.section);
    } else {
      const elem = document.getElementById(link.section);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        {/* Brand Logo */}
        <a href="#hero" onClick={(e) => handleNavClick(e, { section: 'hero' })} className="navbar-logo">
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
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-link ${activeSection === link.section ? 'active' : ''}`}
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

          <a href="#contact" onClick={(e) => handleNavClick(e, { section: 'contact' })} className="btn btn-primary nav-cta">
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
                  onClick={(e) => handleNavClick(e, link)}
                  className={`mobile-nav-link ${activeSection === link.section ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-drawer-cta">
            <a href="#contact" onClick={(e) => handleNavClick(e, { section: 'contact' })} className="btn btn-primary" style={{ width: '100%' }}>
              <Send size={18} />
              <span>Get In Touch</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
