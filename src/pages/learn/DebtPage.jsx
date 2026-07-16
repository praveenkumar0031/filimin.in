// src/pages/learn/DebtPage.jsx
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/learn.css';
export default function DebtPage() {
  return (
    <>
      <Navbar />
      <div className="article-container">
        <Link to="/learn" className="btn-arcade" style={{ marginBottom: "2rem" }}>&larr; BACK TO MANUAL</Link>
        <div className="article-content">
          <div>
        <h2>What Is Debt?</h2>
        <p>
          Debt is something, usually money, owed by one party to another. Many organizations use debt as
          a method of making large purchases they could not afford under normal circumstances. A debt
          arrangement gives the borrowing party permission to borrow money under the condition that it is
          to be paid back at a later date, usually with interest.
        </p>
      </div>
      <div>
        <h2>How Debt Works:</h2>
        <ul>
          <li>Borrowing: You take out a loan or use a credit card, creating a debt.</li>
          <li>Interest: The lender charges interest as the cost of borrowing money.</li>
          <li>Repayment: You must repay the principal plus interest over time.</li>
          <li>Credit Impact: How you manage debt affects your credit score.</li>
        </ul>
        <h2>HOW TO PAY OFF DEBT</h2>
        <p>
          Create a budget and track your spending. List all your debts and their interest rates.
          Use the avalanche method (highest interest first) or snowball method (smallest balance first).
          Consider debt consolidation to simplify payments. Build an emergency fund to prevent new debt.
          Negotiate with creditors for lower rates or settlements. Seek credit counseling if needed.
        </p>
      </div>
      <iframe className="article-video"
        src="https://www.youtube.com/embed/CHiOBzqcMV8"
        title="How to pay off debt"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    
        </div>
      </div>
    </>
  );
}
