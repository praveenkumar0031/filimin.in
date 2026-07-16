// src/pages/learn/LoanPage.jsx
import ArticleLayout from '../../components/ArticleLayout';

export default function LoanPage() {
  return (
    <ArticleLayout topicPath="loan">
      <h2>What Is a Loan?</h2>
      <p>
        A loan is a sum of money that is borrowed and is expected to be paid back with interest.
        Loans can be secured (backed by collateral) or unsecured. Types include commercial loans,
        personal loans, student loans, and mortgages.
      </p>
      <h2>4 Key Components of a Loan</h2>
      <ul>
        <li><strong>Principal</strong> — The original amount borrowed.</li>
        <li><strong>Loan Term</strong> — The duration over which the loan must be repaid.</li>
        <li><strong>Loan Payments</strong> — Regular payments including principal and interest.</li>
        <li><strong>Interest Rate (APR)</strong> — Annual cost of borrowing expressed as a percentage.</li>
      </ul>
      <img src="/loan.jpeg" alt="Loan" className="article-image" />
      <iframe className="article-video"
        src="https://www.youtube.com/embed/dH59z5IOUsY"
        title="Understanding loans"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ArticleLayout>
  );
}
