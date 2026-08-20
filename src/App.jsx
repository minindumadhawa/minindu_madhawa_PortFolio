import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import AllProjectsPage from './components/AllProjectsPage';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'all-projects'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('minindu_portfolio_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('minindu_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateToAllProjects = () => {
    setCurrentPage('all-projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (sectionId = 'hero') => {
    setCurrentPage('home');
    setTimeout(() => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="portfolio-app">
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentPage={currentPage}
        navigateToHome={navigateToHome}
        navigateToAllProjects={navigateToAllProjects}
      />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects onViewAllProjects={navigateToAllProjects} />
            <Services />
            <Contact />
          </>
        ) : (
          <AllProjectsPage onBackToHome={() => navigateToHome('projects')} />
        )}
      </main>
      <Footer 
        navigateToHome={navigateToHome} 
        navigateToAllProjects={navigateToAllProjects}
      />
    </div>
  );
}
