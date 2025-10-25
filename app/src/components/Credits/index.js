import React from 'react';
import './index.css'; // Import the CSS file
import './light.css';
import './dark.css';

function Credits() {
  const contributions = [
    {
      name: 'Lohit P Talavar',
      github: 'https://github.com/lohitpt252003',
      linkedin: 'https://www.linkedin.com/in/lohit-talavar-a73926247/',
      photo: 'https://raw.githubusercontent.com/lohitpt252003/DATA/refs/heads/main/data/assets/images/lohit.png',
      contribution: 'Responsible for the initial project setup, full-stack development including API and frontend implementation, UI/UX design, comprehensive testing, and database integration.'
    }
  ];

  return (
    <div className="credits-container">
      <h2 className="credits-title">Credits ✨</h2>

      <section className="credits-section">
        <h3 className="credits-section-title">Developers 🧑‍💻</h3>
        <p>This project was primarily developed by Lohit P Talavar/TEAM-ANNA . We are passionate about creating robust and efficient solutions.</p>
      </section>

      <section className="credits-section">
        <h3 className="credits-section-title">Technologies Used: ⚙️</h3>
        <ul className="credits-tech-list">
          <li><strong>Frontend:</strong> React ⚛️, JavaScript 📜, HTML/CSS 🎨</li>
          <li><strong>Backend:</strong> Flask 🧪, Python 🐍</li>
        </ul>
      </section>

      <section className="credits-section">
        <h3 className="credits-section-title">Contributions 🤝</h3>
        <div className="credits-contributions-grid">
          {contributions.map((contributor, index) => (
            <div key={index} className="credits-contributor-card">
              <img src={contributor.photo} alt={contributor.name} className="credits-contributor-photo" />
              <h4 className="credits-contributor-name">{contributor.name}</h4>
              <p className="credits-contributor-contribution">{contributor.contribution}</p>
              <div className="credits-contributor-links">
                <a href={contributor.github} target="_blank" rel="noopener noreferrer" className="credits-contributor-link-github">GitHub</a>
                <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer" className="credits-contributor-link-linkedin">LinkedIn</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="credits-section">
        <h3 className="credits-section-title">Special Thanks: 🙏</h3>
        <ul className="credits-special-thanks-list">
          <li>To the open-source community for their invaluable libraries and tools. 🌍</li>
          <li>To Google Gemini for assistance in development. 🤖</li>
        </ul>
      </section>
    </div>
  );
}

export default Credits;
