// src/pages/learn/TaxPage.jsx
import '../../styles/debt.css';
export default function TaxPage() {
  return (
    <>
      <div className="head">
        <h2>What Is Tax?</h2>
        <p>
          A tax is a mandatory financial charge levied by a government on individuals or organizations
          to fund public services and infrastructure. Taxes are the primary source of government revenue,
          funding education, healthcare, defense, roads, and social programs.
        </p>
      </div>
      <div className="head">
        <h2>Types of Taxes</h2>
        <ul>
          <li><strong>Income Tax</strong> — Levied on personal and business earnings.</li>
          <li><strong>Sales Tax</strong> — Added to goods and services at point of sale (indirect tax).</li>
          <li><strong>Property Tax</strong> — Levied on real estate and property ownership (direct tax).</li>
          <li><strong>Capital Gains Tax</strong> — Tax on profit from the sale of investments.</li>
          <li><strong>Corporate Tax</strong> — Tax on business profits.</li>
          <li><strong>Payroll Tax</strong> — Funds Social Security and Medicare.</li>
        </ul>
      </div>
    </>
  );
}
