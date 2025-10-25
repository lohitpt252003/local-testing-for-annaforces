import React, { useEffect } from 'react';
import './index.css';

function HowToUse({ theme }) {
  useEffect(() => {
    document.title = 'How to Use';
  }, []);

  return (
    <div className={`how-to-use-container ${theme}`}>
      <h1>How to Use the Local Problem Viewer</h1>

      <section>
        <h2>Overview</h2>
        <p>This application is a local testing environment designed for <strong>testers, problem setters, and developers</strong> to visualize and interact with the problem, contest, and solution data stored in your local `DATA` directory.</p>
      </section>

      <section>
        <h2>Navigation</h2>
        <p>Use the links in the header to navigate between the main sections:</p>
        <ul>
          <li><strong>Problems:</strong> A list of all available problems.</li>
          <li><strong>Contests:</strong> A list of all available contests.</li>
          <li><strong>Solutions:</strong> A list of all available solutions.</li>
          <li><strong>Test Cases:</strong> An explorer to find the test cases for any problem.</li>
        </ul>
      </section>

      <section>
        <h2>Key Features</h2>
        <p>This viewer has several features to help you during development and testing:</p>
        <ul>
          <li>
            <strong>Data Provenance:</strong> On detail pages, the application shows you the absolute file path for the data's directory and also the specific source file for each piece of content (e.g., `description.md`, `meta.json`). This helps you quickly locate the source of the data you are viewing.
          </li>
          <li>
            <strong>Developer Insights:</strong> Each page displays its own component file path in the top-right corner, making it easier to find and edit the code for the view you are looking at.
          </li>
          <li>
            <strong>Collapsible Sections:</strong> To keep the interface clean, sections like sample cases, contest problem lists, and test cases are collapsed by default. Click on their headers to expand or collapse them.
          </li>
        </ul>
      </section>

      <section>
        <h2>How It Works</h2>
        <p>The frontend application (this website) gets its data from a small Python server (`app.py`) that you run locally. This server reads the files from your `DATA` directory and sends the content to the frontend. This means you can see your changes to the data files reflected here instantly by refreshing the page.</p>
      </section>
    </div>
  );
}

export default HowToUse;
