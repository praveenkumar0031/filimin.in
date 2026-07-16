// src/pages/learn/LeveragePage.jsx
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import '../../styles/learn.css';
export default function LeveragePage() {
  return (
    <>
      <Navbar />
      <div className="article-container">
        <Link to="/learn" className="btn-arcade" style={{ marginBottom: "2rem" }}>&larr; BACK TO MANUAL</Link>
        <div className="article-content">
          <div>
        <h2>What Is Leverage?</h2>
        <p>
          Leverage refers to using borrowed capital (debt) to increase the potential return of an
          investment. In trading, leverage allows you to control a large position with a relatively
          small amount of your own capital — amplifying both gains and losses.
          <br /><br />
          <strong>Margin Trading:</strong> Borrowing money from a broker to purchase securities.
          Investors must maintain a minimum balance called the Maintenance Margin. If the account
          falls below this, a margin call is issued.
        </p>
      </div>
      <div>
        <h2>Key Concepts</h2>
        <ul>
          <li><strong>Initial Margin</strong> — The minimum deposit required to open a leveraged position.</li>
          <li><strong>Maintenance Margin</strong> — The minimum equity required to keep a leveraged position open.</li>
          <li><strong>Leverage Ratio</strong> — Total exposure divided by the actual capital invested.</li>
          <li><strong>Risk</strong> — Leverage magnifies losses just as much as gains — use with caution.</li>
        </ul>
      </div>
      <img src="/LEVER.png" alt="Leverage diagram" className="article-image" />
      <iframe className="article-video"
        src="https://www.youtube.com/embed/GESzfA9odgE"
        title="What is leverage"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    
        </div>
      </div>
    </>
  );
}
