import React from 'react';
import { Code, ArrowUp, Heart } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import { personalData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-top">
          {/* Logo & Info */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              <Code size={24} className="logo-icon" />
              <span className="logo-text">
                Minindu<span className="gradient-text">.dev</span>
              </span>
            </a>
            <p className="footer-tagline">
              Crafting high-performance web experiences with modern architecture.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-nav">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Socials & Back to Top */}
          <div className="footer-actions">
            <div className="footer-socials">
              <a href={personalData.socials.github} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <Github size={18} />
              </a>
              <a href={personalData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <Linkedin size={18} />
              </a>
              <a href={personalData.socials.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                <Twitter size={18} />
              </a>
            </div>

            <button onClick={scrollToTop} className="back-to-top-btn" title="Back to Top">
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
          <p className="built-with">
            Built with <Heart size={14} className="heart-icon" /> using React & Modern CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
