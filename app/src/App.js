import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import ProblemList from './components/ProblemList';
import ContestList from './components/ContestList';
import WelcomePage from './components/WelcomePage';
import ProblemDetail from './components/ProblemDetail';
import SolutionDetail from './components/SolutionDetail';
import ContestDetail from './components/ContestDetail';
import TestCasesExplorer from './components/TestCasesExplorer';
import TestCasesViewer from './components/TestCasesViewer';
import SolutionList from './components/SolutionList';
import HowToUse from './components/HowToUse';
import Credits from './components/Credits';
import Footer from './components/Footer';

import PrivacyPolicy from './components/PrivacyPolicy';
import Contact from './components/Contact';

function App() {
  const [problems, setProblems] = useState(null);
  const [contests, setContests] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const problemsResponse = await fetch('http://localhost:5001/problems');
        if (!problemsResponse.ok) {
          throw new Error(`HTTP error! status: ${problemsResponse.status}`);
        }
        const problemsData = await problemsResponse.json();
        setProblems(problemsData);

        const contestsResponse = await fetch('http://localhost:5001/contests');
        if (!contestsResponse.ok) {
          throw new Error(`HTTP error! status: ${contestsResponse.status}`);
        }
        const contestsData = await contestsResponse.json();
        setContests(contestsData);

      } catch (e) {
        setError(`Failed to fetch data: ${e.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <main className="content-wrapper">
        <Routes>
          <Route path="/" element={<WelcomePage theme={theme} />} />
          <Route path="/problems" element={<ProblemList problems={problems} theme={theme} />} />
          <Route path="/problems/:problemId" element={<ProblemDetail theme={theme} />} />
          <Route path="/problems/:problemId/testcases" element={<TestCasesViewer theme={theme} />} />
          <Route path="/solutions" element={<SolutionList theme={theme} />} />
          <Route path="/solutions/:problemId" element={<SolutionDetail theme={theme} />} />
          <Route path="/contests" element={<ContestList contests={contests} theme={theme} />} />
          <Route path="/contests/:contestId" element={<ContestDetail theme={theme} />} />
          <Route path="/testcases" element={<TestCasesExplorer theme={theme} />} />
          <Route path="/how-to-use" element={<HowToUse theme={theme} />} />
          <Route path="/credits" element={<Credits theme={theme} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
        </Routes>
      </main>
      <Footer theme={theme} />
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;
