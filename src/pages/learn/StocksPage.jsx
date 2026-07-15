// src/pages/learn/StocksPage.jsx
import '../../styles/debt.css';
export default function StocksPage() {
  return (
    <>
      <div className="head">
        <h2>What Are Stocks?</h2>
        <p>
          A stock (also known as equity) is a security that represents the ownership of a fraction of the
          issuing corporation. Units of stock are called "shares." Companies need capital to grow — they
          raise it by selling ownership stakes to the public. Stocks can be categorized by market cap,
          ownership type, fundamentals, price volatility, profit sharing, and economic trends.
        </p>
      </div>
      <div className="head">
        <h2>Why Companies Issue Stocks</h2>
        <p>
          When a company issues stock, it is effectively selling a piece of itself in exchange for cash.
          That capital is then used for growth, research, paying debts, or other business operations.
          Investors who purchase stock become partial owners and may benefit from the company's growth
          through rising stock prices and dividends.
        </p>
      </div>
      <iframe
        src="https://www.youtube.com/embed/2fLd4VQHKNg"
        title="What are stocks"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
}
