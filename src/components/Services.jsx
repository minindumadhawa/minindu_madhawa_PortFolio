import React from 'react';
import { Sparkles, Layout, Smartphone, Cpu, Zap, ArrowUpRight, Globe, Layers, Palette, Server } from 'lucide-react';
import { servicesData } from '../data/portfolioData';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const IconRenderer = ({ iconName }) => {
  const map = {
    Layout: <Layout size={26} className="service-card-icon" />,
    Smartphone: <Smartphone size={26} className="service-card-icon" />,
    Cpu: <Cpu size={26} className="service-card-icon" />,
    Zap: <Zap size={26} className="service-card-icon" />,
    Globe: <Globe size={26} className="service-card-icon" />,
    Layers: <Layers size={26} className="service-card-icon" />,
    Palette: <Palette size={26} className="service-card-icon" />,
    Server: <Server size={26} className="service-card-icon" />
  };
  return map[iconName] || <Sparkles size={26} className="service-card-icon" />;
};

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <motion.div 
          className="section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
        >
          <div className="badge">
            <Sparkles size={16} />
            <span>Offerings</span>
          </div>
          <h2>Services I <span className="gradient-text">Provide</span></h2>
          <p>Delivering high-quality digital products engineered for scalability, speed, and design precision.</p>
        </motion.div>

        <motion.div 
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {servicesData.map((service, index) => (
            <motion.div 
              variants={fadeUp} 
              key={index} 
              className="glass-card service-card"
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="service-icon-box">
                <IconRenderer iconName={service.icon} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              
              <a href="#contact" className="service-action-link">
                <span>Inquire Service</span>
                <ArrowUpRight size={16} className="service-link-arrow" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
