// src/pages/learn/CreditPage.jsx
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/learn.css';
export default function CreditPage() {
  return (
    <>
      <Navbar />
      <div className="article-container">
        <Link to="/learn" className="btn-arcade" style={{ marginBottom: "2rem" }}>&larr; BACK TO MANUAL</Link>
        <div className="article-content">
          <div>
        <h2>What Is Credit?</h2>
        <p>
          Credit is the ability to borrow money or access goods or services with the understanding
          that you will pay later. It is a contractual agreement between a borrower and a lender.
          Good credit management is essential for financial health.
        </p>
      </div>
      <div>
        <h2>Key Credit Terms</h2>
        <ol>
          <li>Annual Fee — A yearly fee charged by a credit card issuer for use of the card.</li>
          <li>APR (Annual Percentage Rate) — The yearly interest rate charged on outstanding balances.</li>
          <li>Credit Line — The maximum amount of credit extended to a borrower.</li>
          <li>Credit Rating — An assessment of creditworthiness based on repayment history.</li>
          <li>Grace Period — Time between purchase and when interest starts accruing.</li>
          <li>Introductory Rate — A lower promotional interest rate offered for a limited period.</li>
          <li>Minimum Payment — The smallest amount you must pay each billing cycle.</li>
          <li>Overdraft Protection — A service linking accounts to cover insufficient funds.</li>
          <li>Credit Bureau — Agencies (Equifax, Experian, TransUnion) that compile credit reports.</li>
        </ol>
      </div>
      <iframe className="article-video"
        src="https://www.youtube.com/embed/fTTGALaRZoc"
        title="Understanding credit"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    
        </div>
      </div>
    </>
  );
}
