// src/pages/learn/CompoundInterestPage.jsx
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/learn.css';
export default function CompoundInterestPage() {
  return (
    <>
      <Navbar />
      <div className="article-container">
        <Link to="/learn" className="btn-arcade" style={{ marginBottom: "2rem" }}>&larr; BACK TO MANUAL</Link>
        <div className="article-content">
          <div>
        <h2>Compound Interest</h2>
        <p>
          Compound interest is calculated on both the initial principal and the accumulated
          interest from previous periods.
          <br /><br />
          <strong>Formula:</strong> A = P(1 + r/n)^(nt)
          <br />
          Where A = final amount, P = principal, r = annual rate, n = times compounded per year,
          t = time in years.
          <br /><br />
          Compound Interest = A − P
          <br /><br />
          Applications include population growth, bacteria growth, asset appreciation, and
          loan amortization (depreciation of assets).
        </p>
      </div>
      <div>
        <h2>The Power of Compounding</h2>
        <p>
          Albert Einstein reportedly called compound interest the &quot;eighth wonder of the world.&quot;
          The longer your money compounds, the more dramatically it grows. Starting to save early
          is the most powerful advantage any investor can have — even small amounts invested young
          can grow to substantial wealth over decades.
        </p>
      </div>
      <iframe className="article-video"
        src="https://www.youtube.com/embed/lNK95khKvSk"
        title="Compound interest explained"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    
        </div>
      </div>
    </>
  );
}
