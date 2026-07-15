// src/pages/learn/AssetPage.jsx
import '../../styles/debt.css';
export default function AssetPage() {
  return (
    <>
      <div className="head">
        <h2>What Is an Asset?</h2>
        <p>
          An asset is a resource with economic value that an individual, corporation, or country owns
          or controls with the expectation that it will provide a future benefit. Assets are reported on
          a company&apos;s balance sheet and are bought or created to increase a firm&apos;s value or
          benefit the firm&apos;s operations.
        </p>
      </div>
      <div className="head">
        <h2>Types of Assets</h2>
        <dl>
          <dt>Current Assets</dt>
          <dd>Assets expected to be converted to cash within one year (cash, accounts receivable, inventory).</dd>
          <dt>Fixed Assets</dt>
          <dd>Long-term assets with useful life greater than one year; subject to depreciation (property, equipment).</dd>
          <dt>Financial Assets</dt>
          <dd>Assets deriving value from a contractual claim (stocks, bonds, bank deposits, equity).</dd>
          <dt>Intangible Assets</dt>
          <dd>Non-physical assets with value (patents, trademarks, copyrights, goodwill).</dd>
        </dl>
      </div>
      <img src="/asset.webp" alt="Types of assets" style={{ height: '300px' }} />
      <iframe
        src="https://www.youtube.com/embed/Ze3VospNcsI"
        title="What is an asset"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </>
  );
}
