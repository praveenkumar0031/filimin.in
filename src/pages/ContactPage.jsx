// src/pages/ContactPage.jsx
// Mirrors contact.html: simple contact form (no backend - form action="#" as original).

import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/contact.css';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Original had no backend wiring — mirrors the same behavior
    setSubmitted(true);
  };

  return (
    <div className="box" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="contact-container">
        <div className="logo-link">
          <Link to="/">
            <img src="/icon.png" width="80" height="80" alt="Filimin" />
          </Link>
        </div>

        <h2>Contact Us</h2>

        {submitted ? (
          <p style={{ color: '#007bff', textAlign: 'center' }}>
            Thank you! We&apos;ll get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                rows="5"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button id="submit" type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}
