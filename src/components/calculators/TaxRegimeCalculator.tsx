import React, { useState } from 'react';
import { computeNewRegimeTaxFY2627 } from '../../lib/finance-math';

export default function TaxRegimeCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(1500000);

  const result = computeNewRegimeTaxFY2627(grossSalary);

  const formatRupees = (num: number) => {
    return '₹' + num.toLocaleString('en-IN');
  };

  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: '1.5rem',
      maxWidth: '600px',
      margin: '1.5rem 0',
      color: '#e6edf3'
    }}>
      <h3 style={{ margin: '0 0 1rem 0', color: '#58a6ff' }}>FY 2026-27 New Tax Regime Calculator</h3>
      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#8b949e' }}>
          Annual Gross Salary: <strong>{formatRupees(grossSalary)}</strong>
        </label>
        <input
          type="range"
          min="300000"
          max="5000000"
          step="25000"
          value={grossSalary}
          onChange={(e) => setGrossSalary(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#2ea043' }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0.75rem',
        background: '#0d1117',
        padding: '1rem',
        borderRadius: '6px',
        marginBottom: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Standard Deduction</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#e6edf3' }}>{formatRupees(result.standardDeduction)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Taxable Income</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: '#e6edf3' }}>{formatRupees(result.taxableIncome)}</div>
        </div>
      </div>

      <div style={{
        background: result.totalTax === 0 ? 'rgba(46, 160, 67, 0.15)' : 'rgba(88, 166, 255, 0.15)',
        border: `1px solid ${result.totalTax === 0 ? '#3fb950' : '#58a6ff'}`,
        borderRadius: '6px',
        padding: '1rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.85rem', color: '#8b949e' }}>
          {result.totalTax === 0 ? 'Sec 87A Full Rebate Applies' : 'Total Tax Payable (incl. 4% Cess)'}
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700, color: result.totalTax === 0 ? '#3fb950' : '#ffffff' }}>
          {formatRupees(result.totalTax)}
        </div>
      </div>
    </div>
  );
}
