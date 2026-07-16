// src/pages/learn/CompoundInterestPage.jsx
import ArticleLayout from '../../components/ArticleLayout';

export default function CompoundInterestPage() {
  return (
    <ArticleLayout topicPath="compound-interest">
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
      <h2>The Power of Compounding</h2>
      <p>
        Albert Einstein reportedly called compound interest the "eighth wonder of the world."
        The longer your money compounds, the more dramatically it grows. Starting to save early
        is the most powerful advantage any investor can have — even small amounts invested young
        can grow to substantial wealth over decades.
      </p>
      <iframe className="article-video"
        src="https://www.youtube.com/embed/lNK95khKvSk"
        title="Compound interest explained"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </ArticleLayout>
  );
}
