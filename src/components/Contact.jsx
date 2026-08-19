import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <div className="badge">
            <MessageSquare size={16} />
            <span>Get In Touch</span>
          </div>
          <h2>Let's Build Something <span className="gradient-text">Great Together</span></h2>
          <p>Have a project in mind, a job opportunity, or just want to connect? Send me a message!</p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Info Card */}
          <div className="glass-card contact-info-card">
            <h3 className="contact-card-title">Contact Details</h3>
            <p className="contact-card-text">
              Feel free to reach out via email, phone, or the contact form. I typically respond within 24 hours.
            </p>

            <div className="contact-info-list">
              {/* Email with copy button */}
              <div className="contact-info-item">
                <div className="info-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div className="info-text-box">
                  <span className="info-label">Email Address</span>
                  <div className="email-copy-wrap">
                    <span className="info-val">{personalData.email}</span>
                    <button 
                      onClick={handleCopyEmail}
                      className="copy-btn"
                      title="Copy Email"
                    >
                      {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-info-item">
                <div className="info-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="info-text-box">
                  <span className="info-label">Phone</span>
                  <span className="info-val">{personalData.phone}</span>
                </div>
              </div>

              {/* Location */}
              <div className="contact-info-item">
                <div className="info-icon-wrapper">
                  <MapPin size={20} />
                </div>
                <div className="info-text-box">
                  <span className="info-label">Location</span>
                  <span className="info-val">{personalData.location}</span>
                </div>
              </div>
            </div>

            {/* Status availability box */}
            <div className="availability-box">
              <span className="status-dot-pulse"></span>
              <div>
                <p className="availability-title">Currently Available</p>
                <p className="availability-desc">Open for freelance projects & full-time roles.</p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="glass-card contact-form-card">
            <form onSubmit={handleSubmit} className="contact-form">
              {submitted && (
                <div className="form-success-banner">
                  <Check size={20} />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Minindu Madhawa"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="Project Discussion / Freelance / Inquiry"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows="5"
                  required
                  placeholder="Hi Minindu, I would like to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary form-submit-btn"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
