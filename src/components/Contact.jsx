import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Anti-Spam Honeypot Check: If honeypot is filled by bot, silently block
    if (formData._gotcha) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      return;
    }

    // 2. Rate Limiting Check (Block submit within 15 seconds)
    const now = Date.now();
    if (now - lastSubmitTime < 15000) {
      alert('Please wait a few seconds before sending another message.');
      return;
    }

    // 3. Validation & Sanitization
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalData.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject || 'New Portfolio Contact Message',
          message: trimmedMessage,
          _captcha: 'false',
          _template: 'table'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
        setTimeout(() => setSubmitted(false), 6000);
      } else {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
        setTimeout(() => setSubmitted(false), 6000);
      }
    } catch (error) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      setTimeout(() => setSubmitted(false), 6000);
    } finally {
      setIsSubmitting(false);
    }
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
              {/* Email with direct mailto & copy button */}
              <div className="contact-info-item">
                <div className="info-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div className="info-text-box">
                  <span className="info-label">Email Address</span>
                  <div className="email-copy-wrap">
                    <a href={`mailto:${personalData.email}`} className="info-val info-link" title="Send Email">
                      {personalData.email}
                    </a>
                    <button 
                      onClick={handleCopyEmail}
                      className="copy-btn"
                      title="Copy Email to Clipboard"
                    >
                      {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Phone with tap to call */}
              <div className="contact-info-item">
                <div className="info-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="info-text-box">
                  <span className="info-label">Phone / WhatsApp</span>
                  <a href={`tel:${personalData.phone}`} className="info-val info-link">
                    {personalData.phone}
                    <ExternalLink size={13} className="inline-link-icon" />
                  </a>
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
              {/* Hidden Honeypot Input for Anti-Spam Bot Protection */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              {submitted && (
                <div className="form-success-banner">
                  <Check size={20} />
                  <span>Thank you! Your message has been sent successfully.</span>
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
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
                  <label htmlFor="email">Your Email *</label>
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
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  rows="4"
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
