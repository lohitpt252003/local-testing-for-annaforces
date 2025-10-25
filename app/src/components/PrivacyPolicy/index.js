import React from 'react';
import './index.css';
import './light.css';
import './dark.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p>Your privacy is important to us. It is Annaforces' policy to respect your privacy regarding any information we may collect from you across our website.</p>
      <h2>1. Information we collect</h2>
      <p>We only collect information about you if we have a reason to do so - for example, to provide our Services, to communicate with you, or to make our Services better.</p>
      <h2>2. How we use information</h2>
      <p>We use the information we collect in various ways, including to:</p>
      <ul>
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Develop new products, services, features, and functionality</li>
      </ul>
      <h2>3. Security</h2>
      <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
    </div>
  );
}

export default PrivacyPolicy;