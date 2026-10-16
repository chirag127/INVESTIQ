import React, { useState } from 'react';
import { calculateSIP } from '../../lib/finance-math';

export default function SIPCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState<number>(10000);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [tenureYears, setTenureYears] = useState<number>(10);

  const result = calculateSIP(monthlyAmount, expectedReturn / 100, tenureYears * 12);

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
      <h3 style={{ margin: '0 0 1rem 0', color: '#58a6ff' }}>Systematic Investment Plan (SIP) Calculator</h3>
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#8b949e' }}>
          Monthly Investment: <strong>{formatRupees(monthlyAmount)}</strong>
        </label>
        <input
          type="range"
          min="500"
          max="100000"
          step="500"
          value={monthlyAmount}
          onChange={(e) => setMonthlyAmount(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#2ea043' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#8b949e' }}>
          Expected Annual Return (%): <strong>{expectedReturn}%</strong>
        </label>
        <input
          type="range"
          min="1"
          max="30"
          step="0.5"
          value={expectedReturn}
          onChange={(e) => setExpectedReturn(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#2ea043' }}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem', color: '#8b949e' }}>
          Investment Tenure: <strong>{tenureYears} Years</strong>
        </label>
        <input
          type="range"
          min="1"
          max="35"
          step="1"
          value={tenureYears}
          onChange={(e) => setTenureYears(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#2ea043' }}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '0.75rem',
        background: '#0d1117',
        padding: '1rem',
        borderRadius: '6px',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Total Invested</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e6edf3' }}>{formatRupees(result.totalInvested)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Wealth Gained</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#3fb950' }}>{formatRupees(result.wealthGained)}</div>
        </div>
        <div>
          <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Total Maturity</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#58a6ff' }}>{formatRupees(result.futureValue)}</div>
        </div>
      </div>
    </div>
  );
}
