// src/pages/AboutPage.jsx
// Mirrors tl.html: animated timeline with 4 entries (Credits, About, Q&A, Contact).

import Navbar from '../components/Navbar';
import '../styles/tl.css';
import '../styles/AR.css';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="timeline">

        {/* CREDITS */}
        <div className="left-container">
          <div className="tl-icon">💳</div>
          <div className="text-box">
            <p className="left-title">CREDITS</p>
            <pre id="pre">
              Naveen kumar C{'\n'}
              Rithin AR{'\n'}
              Praveen kumar S
            </pre>
            <span className="left-arrow"></span>
          </div>
        </div>

        {/* ABOUT */}
        <div className="right-container">
          <div className="tl-icon">👥</div>
          <div className="text-box">
            <p className="right-title">ABOUT</p>
            <p>
              Our Financial Literacy game is to make users to bring up the idea of Budgetting,
              Saving, Debt Management, Investing, Taxes and Financial Literacy. Financial Literacy
              is a Vital knowledge to run our life economically healthy. Our game enlightens users
              about finance and its importance.
            </p>
            <span className="right-arrow"></span>
          </div>
        </div>

        {/* Q&A */}
        <div className="left-container">
          <div className="tl-icon">❓</div>
          <div className="text-box">
            <p className="left-title">Q\A</p>
            <p>
              OUR PROJECT HELPS YOU IN GAINING FINANCIAL LITERACY BY PLAYING INTERACTIVE QUIZ AND
              DETAIL REPORT OF YOUR PROGRESS. SO THAT YOU CAN FURTHER DEVELOP AND FOCUS ON THE
              AREA WHERE YOU LACK.
            </p>
            <span className="left-arrow"></span>
          </div>
        </div>

        {/* CONTACT */}
        <div className="right-container">
          <div className="tl-icon">✉️</div>
          <div className="text-box">
            <p className="right-title">CONTACT US</p>
            <p>PHONE: 9965518225</p>
            <p>MAIL: rithinar23it@srishakthi.ac.in</p>
            <span className="right-arrow"></span>
          </div>
        </div>

      </div>
    </>
  );
}
