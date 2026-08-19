import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

export default function App() {
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

  return (
    <div className="portfolio-app">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
