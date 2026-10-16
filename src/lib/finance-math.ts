/**
 * Future Value of a Systematic Investment Plan (SIP)
 * P: monthly investment
 * r: annual expected return rate (e.g. 0.12 for 12%)
 * n: tenure in months
 */
export function calculateSIP(monthlyInvestment: number, annualRate: number, tenureMonths: number): {
  totalInvested: number;
  futureValue: number;
  wealthGained: number;
} {
  const i = annualRate / 12;
  const totalInvested = monthlyInvestment * tenureMonths;
  if (i === 0) {
    return { totalInvested, futureValue: totalInvested, wealthGained: 0 };
  }
  // Formula: M = P * (( (1 + i)^n - 1 ) / i) * (1 + i)
  const futureValue = monthlyInvestment * (((Math.pow(1 + i, tenureMonths) - 1) / i) * (1 + i));
  return {
    totalInvested: Math.round(totalInvested),
    futureValue: Math.round(futureValue),
    wealthGained: Math.round(futureValue - totalInvested)
  };
}

/**
 * Extended Internal Rate of Return (XIRR) using Newton-Raphson
 */
export function calculateXIRR(cashFlows: { date: Date; amount: number }[], guess = 0.1): number {
  if (cashFlows.length < 2) return 0;
  const t0 = cashFlows[0].date.getTime();
  const maxIter = 100;
  const tol = 1e-6;
  let rate = guess;

  for (let iter = 0; iter < maxIter; iter++) {
    let fValue = 0;
    let fDerivative = 0;

    for (const cf of cashFlows) {
      const dt = (cf.date.getTime() - t0) / (365.25 * 24 * 3600 * 1000);
      const denom = Math.pow(1 + rate, dt);
      fValue += cf.amount / denom;
      fDerivative -= (dt * cf.amount) / (denom * (1 + rate));
    }

    if (Math.abs(fValue) < tol) return rate;
    if (Math.abs(fDerivative) < 1e-12) break;

    const newRate = rate - fValue / fDerivative;
    if (Math.abs(newRate - rate) < tol) return newRate;
    rate = newRate;
  }

  return rate;
}

/**
 * Income Tax Computation for Individual Salaried under New Tax Regime (FY 2026-27)
 */
export function computeNewRegimeTaxFY2627(grossSalary: number): {
  grossSalary: number;
  standardDeduction: number;
  taxableIncome: number;
  taxBeforeCess: number;
  cess: number;
  totalTax: number;
} {
  const standardDeduction = 75000;
  const taxableIncome = Math.max(0, grossSalary - standardDeduction);

  // Section 87A rebate makes taxable income up to ₹12 lakh effectively 0 tax
  if (taxableIncome <= 1200000) {
    return {
      grossSalary,
      standardDeduction,
      taxableIncome,
      taxBeforeCess: 0,
      cess: 0,
      totalTax: 0
    };
  }

  let tax = 0;
  // Slabs:
  // 0 - 4L: 0%
  // 4L - 8L: 5% (max 20k)
  // 8L - 12L: 10% (max 40k)
  // 12L - 16L: 15% (max 60k)
  // 16L - 20L: 20% (max 80k)
  // 20L - 24L: 25% (max 1L)
  // Above 24L: 30%
  if (taxableIncome > 400000) {
    tax += Math.min(taxableIncome - 400000, 400000) * 0.05;
  }
  if (taxableIncome > 800000) {
    tax += Math.min(taxableIncome - 800000, 400000) * 0.10;
  }
  if (taxableIncome > 1200000) {
    tax += Math.min(taxableIncome - 1200000, 400000) * 0.15;
  }
  if (taxableIncome > 1600000) {
    tax += Math.min(taxableIncome - 1600000, 400000) * 0.20;
  }
  if (taxableIncome > 2000000) {
    tax += Math.min(taxableIncome - 2000000, 400000) * 0.25;
  }
  if (taxableIncome > 2400000) {
    tax += (taxableIncome - 2400000) * 0.30;
  }

  const cess = tax * 0.04;
  return {
    grossSalary,
    standardDeduction,
    taxableIncome,
    taxBeforeCess: Math.round(tax),
    cess: Math.round(cess),
    totalTax: Math.round(tax + cess)
  };
}
