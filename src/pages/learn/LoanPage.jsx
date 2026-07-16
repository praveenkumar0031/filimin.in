// src/pages/learn/LoanPage.jsx
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/learn.css';
export default function LoanPage() {
  return (
    <>
      <Navbar />
      <div className="article-container">
        <Link to="/learn" className="btn-arcade" style={{ marginBottom: "2rem" }}>&larr; BACK TO MANUAL</Link>
        <div className="article-content">
          <div>
        <h2>What Is a Loan?</h2>
        <p>
          A loan is a sum of money that is borrowed and is expected to be paid back with interest.
          Loans can be secured (backed by collateral) or unsecured. Types include commercial loans,
          personal loans, student loans, and mortgages.
        </p>
      </div>
      <div>
        <h2>4 Key Components of a Loan</h2>
        <ul>
          <li><strong>Principal</strong> — The original amount borrowed.</li>
          <li><strong>Loan Term</strong> — The duration over which the loan must be repaid.</li>
          <li><strong>Loan Payments</strong> — Regular payments including principal and interest.</li>
          <li><strong>Interest Rate (APR)</strong> — Annual cost of borrowing expressed as a percentage.</li>
        </ul>
      </div>
      <img src="/loan.jpeg" alt="Loan" className="article-image" />
      <iframe className="article-video"
        src="https://www.youtube.com/embed/dH59z5IOUsY"
        title="Understanding loans"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    
        </div>
      </div>
    </>
  );
}
