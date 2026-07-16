// src/pages/learn/SimpleInterestPage.jsx
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/learn.css';
export default function SimpleInterestPage() {
  return (
    <>
      <Navbar />
      <div className="article-container">
        <Link to="/learn" className="btn-arcade" style={{ marginBottom: "2rem" }}>&larr; BACK TO MANUAL</Link>
        <div className="article-content">
          <div>
        <h2>Simple Interest</h2>
        <p>
          Simple Interest is calculated only on the principal amount borrowed or invested.
          <br /><br />
          <strong>Formula:</strong> SI = P × r × n
          <br />
          Where P = Principal, r = rate of interest per period, n = number of periods.
          <br /><br />
          <strong>Example:</strong> $10,000 at 10% per year for 3 years:
          SI = 10,000 × 0.10 × 3 = <strong>$3,000</strong> total interest.
          <br /><br />
          Unlike compound interest, simple interest does not earn interest on interest.
          It is commonly used for car loans, short-term loans, and savings bonds.
        </p>
      </div>
      <div>
        <h2>Simple vs Compound Interest</h2>
        <p>
          Simple interest is straightforward and predictable — ideal for short-term borrowing.
          Compound interest grows faster over time because interest is added to the principal
          at each period and earns further interest. For long-term savings, compound interest
          significantly outperforms simple interest.
        </p>
      </div>
      <iframe className="article-video"
        src="https://www.youtube.com/embed/XSGdzJSO3sQ"
        title="Simple Interest explained"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    
        </div>
      </div>
    </>
  );
}
