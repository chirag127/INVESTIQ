import { describe, it, expect } from 'vitest';
import { calculateSIP, computeNewRegimeTaxFY2627, calculateXIRR } from '../src/lib/finance-math';

describe('Financial Math Tests', () => {
  it('correctly computes monthly SIP future value', () => {
    // ₹10,000/month for 12 months at 12% annual return
    const result = calculateSIP(10000, 0.12, 12);
    expect(result.totalInvested).toBe(120000);
    // Standard future value for beginning-of-period payments at 1% per month for 12 months is ~ ₹1,28,093
    expect(result.futureValue).toBeGreaterThan(127000);
    expect(result.futureValue).toBeLessThan(129000);
  });

  it('correctly calculates new tax regime zero tax for income up to ₹12 lakh threshold', () => {
    // Gross 12.5 lakh with 75k standard deduction = 11.75 lakh taxable => 0 tax under Section 87A rebate
    const result = computeNewRegimeTaxFY2627(1250000);
    expect(result.taxableIncome).toBe(1175000);
    expect(result.totalTax).toBe(0);
  });

  it('correctly computes tax above the rebate threshold', () => {
    // Gross 15.75L with 75k standard deduction = 15.00L taxable income
    // Taxable: 15L
    // Slabs: 0-4L: 0, 4-8L: 20k, 8-12L: 40k, 12-15L (3L * 15%): 45k => 105k + 4% cess = 1,09,200
    const result = computeNewRegimeTaxFY2627(1575000);
    expect(result.taxableIncome).toBe(1500000);
    expect(result.taxBeforeCess).toBe(105000);
    expect(result.totalTax).toBe(109200);
  });

  it('calculates XIRR for standard cash flow sequence', () => {
    const cashFlows = [
      { date: new Date('2025-01-01'), amount: -100000 },
      { date: new Date('2026-01-01'), amount: 112000 }
    ];
    const irr = calculateXIRR(cashFlows);
    expect(irr).toBeCloseTo(0.12, 2);
  });
});
