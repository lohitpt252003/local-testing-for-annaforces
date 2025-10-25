import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './index.css';

function Footer({ theme }) {
  return (
    <footer className={`footer-container ${theme}`}>
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text"><span>Anna</span>forces</h1>
          <p>
            Annaforces is a platform for competitive programming enthusiasts to practice and compete.
          </p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/how-to-use">How to Use</Link></li>
            <li><Link to="/credits">Credits</Link></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="https://github.com/lohitpt252003"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/lohit-talavar-a73926247/"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Annaforces | Designed by Lohit P Talavar
      </div>
    </footer>
  );
}

export default Footer;