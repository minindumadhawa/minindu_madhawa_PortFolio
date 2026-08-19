import React from 'react';
import { Sparkles, Layout, Smartphone, Cpu, Zap, ArrowUpRight } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

const IconRenderer = ({ iconName }) => {
  const map = {
    Layout: <Layout size={28} className="service-card-icon" />,
    Smartphone: <Smartphone size={28} className="service-card-icon" />,
    Cpu: <Cpu size={28} className="service-card-icon" />,
    Zap: <Zap size={28} className="service-card-icon" />
  };
  return map[iconName] || <Sparkles size={28} className="service-card-icon" />;
};

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Sparkles size={16} />
            <span>Offerings</span>
          </div>
          <h2>Services I <span className="gradient-text">Provide</span></h2>
          <p>Delivering high-quality digital products engineered for scalability, speed, and design precision.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="glass-card service-card">
              <div className="service-icon-box">
                <IconRenderer iconName={service.icon} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              
              <a href="#contact" className="service-action-link">
                <span>Inquire Service</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
