import React from 'react';
import './index.css';
import './light.css';
import './dark.css';

function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, please feel free to contact us.</p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;