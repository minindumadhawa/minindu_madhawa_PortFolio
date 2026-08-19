import React from 'react';
import { Briefcase, GraduationCap, Calendar, Building2 } from 'lucide-react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <Briefcase size={16} />
            <span>Career Journey</span>
          </div>
          <h2>Experience & <span className="gradient-text">Education</span></h2>
          <p>My professional growth, employment history, and academic foundation.</p>
        </div>

        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          {experienceData.map((item, index) => (
            <div key={index} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-node">
                {item.type === 'Work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
              </div>

              <div className="glass-card timeline-card">
                <div className="timeline-period-badge">
                  <Calendar size={14} />
                  <span>{item.period}</span>
                </div>

                <h3 className="timeline-role">{item.role}</h3>
                
                <div className="timeline-company">
                  <Building2 size={16} />
                  <span>{item.company}</span>
                </div>

                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
