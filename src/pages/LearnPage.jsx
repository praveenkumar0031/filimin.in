// src/pages/LearnPage.jsx
// Mirrors learn.html: animated glow cards linking to learn sub-pages.
// External links open in new tab; internal topics use React Router Link.

import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/learn.css';

export default function LearnPage() {
  return (
    <>
      <Navbar />

      {/* Row 1 — 5 internal topic cards */}
      <div className="overall">
        <Link to="/learn/stocks"  className="card">STOCKS</Link>
        <a href="https://www.investopedia.com/terms/f/funding.asp" target="_blank" rel="noreferrer" className="card">FUNDING</a>
        <a href="https://www.investopedia.com/terms/t/trade.asp"   target="_blank" rel="noreferrer" className="card">TRADE</a>
        <Link to="/learn/crypto"  className="card">CRYPTO</Link>
        <Link to="/learn/debt"    className="card">DEBT</Link>
      </div>

      {/* Row 2 — 7 internal topic cards */}
      <div className="overall">
        <Link to="/learn/credit"            className="card">CREDIT</Link>
        <Link to="/learn/loan"              className="card">LOAN</Link>
        <Link to="/learn/compound-interest" className="card">COMPOUND INTEREST</Link>
        <Link to="/learn/simple-interest"   className="card">SIMPLE INTEREST</Link>
        <Link to="/learn/leverage"          className="card">LEVERAGE</Link>
        <Link to="/learn/asset"             className="card">ASSET</Link>
        <Link to="/learn/tax"               className="card">TAX</Link>
      </div>

      {/* Row 3 — external reference links */}
      <div className="overall">
        <a href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-score-en-315/" target="_blank" rel="noreferrer" className="card">CREDIT SCORE</a>
        <a href="https://capital.com/monetary-value-definition"                            target="_blank" rel="noreferrer" className="card">MONEY VALUE</a>
        <a href="https://corporatefinanceinstitute.com/resources/accounting/liquidity/"    target="_blank" rel="noreferrer" className="card">LIQUIDITY</a>
        <a href="https://www.investopedia.com/terms/r/rateofreturn.asp"                    target="_blank" rel="noreferrer" className="card">RATE OF RETURN</a>
      </div>
    </>
  );
}
