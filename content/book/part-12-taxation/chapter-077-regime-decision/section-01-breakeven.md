---
id: "sec-077-01"
chapter: "ch-077"
title: "New vs Old Tax Regime: Mathematical Decision Engine"
wordTarget: 2600
status: "published"
lastVerified: "2026-10-17"
sources: ["S001"]
facts: ["tax_regime_new_fy2627"]
legalClass: "L1"
owns: ["c-regime-breakeven"]
refs: ["c-new-tax-regime"]
---

## 1. Context & Legislative Architecture for FY 2026-27

Under the updated Income-tax framework applicable for Assessment Year 2027-28 (Financial Year 2026-27), the **New Tax Regime is the statutory default** for all individuals, HUFs, and Association of Persons.

Taxpayers retain the option to exercise a choice to opt into the **Old Tax Regime**, but doing so requires conscious evaluation against statutory deduction thresholds. For salaried individuals, this option can be chosen annually at the time of filing the return of income under Section 139(1). For individuals having business or professional income (e.g. consulting, freelancing, or partnership firms), the option to switch is available only once in a lifetime, after which reverting back to the old regime is heavily constrained.

---

## 2. The Tax Rate Slabs Comparison (FY 2026-27)

### New Tax Regime Slabs (Default)
- **Standard Deduction (Salaried):** ₹75,000 (increased by Finance Act).
- **Section 87A Rebate:** Applicable if taxable income does not exceed ₹12,00,000. Effectively results in **Zero Tax** up to a gross salary of ₹12,75,000 (₹12,75,000 - ₹75,000 standard deduction = ₹12,00,000 taxable).

| Taxable Income Slab (₹) | New Regime Tax Rate | Cumulative Tax on Slab Upper Bound (₹) |
| :--- | :--- | :--- |
| **0 to 4,00,000** | Nil | Nil |
| **4,00,001 to 8,00,000** | 5% | ₹20,000 |
| **8,00,001 to 12,00,000** | 10% | ₹60,000 *(Full rebate under Sec 87A applies)* |
| **12,00,001 to 16,00,000** | 15% | ₹1,20,000 |
| **16,00,001 to 20,00,000** | 20% | ₹2,00,000 |
| **20,00,001 to 24,00,000** | 25% | ₹3,00,000 |
| **Above 24,00,000** | 30% | Slabs + 30% on excess |

*(Health and Education Cess of 4% applies on total tax across all tiers).*

### Old Tax Regime Slabs (Optional)
- **Standard Deduction (Salaried):** ₹50,000.
- **Section 87A Rebate:** Taxable income up to ₹5,00,000 (Max rebate ₹12,500).
- **Slabs:**
  - Up to ₹2,50,000: Nil
  - ₹2,50,001 to ₹5,00,000: 5%
  - ₹5,00,001 to ₹10,00,000: 20%
  - Above ₹10,00,000: 30%

---

## 3. The Breakeven Deduction Theorem

To determine whether the Old Tax Regime is financially beneficial, you must compute your **Total Eligible Deductions** ($D_{tot}$) under the Old Regime:

$$D_{tot} = \text{Sec 80C} + \text{Sec 80D} + \text{Sec 24(b)} + \text{HRA} + \text{Sec 80CCD(1B)}$$

Where:
- Section 80C (PPF, ELSS, EPF, Term Insurance, Tuition fees): Capped at ₹1,50,000.
- Section 80D (Health Insurance premium for self and parents): ₹25,000 to ₹1,00,000 depending on senior citizen status.
- Section 24(b) (Home loan interest on self-occupied property): Capped at ₹2,00,000.
- House Rent Allowance (HRA) exemption under Section 10(13A): Actual rent paid minus 10% of basic salary.
- Section 80CCD(1B) (Additional NPS deduction): Capped at ₹50,000.

### The Mathematical Rule of Thumb
If your gross income is between ₹15,00,000 and ₹25,00,000:
- You require **more than ₹3,75,000 to ₹4,25,000 in genuine deductions** in the Old Regime to break even with the New Regime.
- If you do not pay high house rent (HRA) or high home-loan interest (Section 24b), **the New Tax Regime is mathematically superior** in over 92% of salaried household scenarios.

---

## 4. Worked Numerical Comparison

Let us analyze a concrete scenario for an engineer earning **₹18,00,000 gross salary**:

### Scenario A: Moderate Deductions
- Gross Salary: ₹18,00,000
- Section 80C: ₹1,50,000
- Section 80D: ₹25,000
- Total Deductions (Old Regime): ₹1,75,000 + ₹50,000 Std Deduction = ₹2,25,000.

#### Computation:
1. **New Tax Regime:**
   - Taxable Income: ₹18,00,000 - ₹75,000 = ₹17,25,000.
   - Slabs:
     - 0 to 4L: ₹0
     - 4L to 8L (5%): ₹20,000
     - 8L to 12L (10%): ₹40,000
     - 12L to 16L (15%): ₹60,000
     - 16L to 17.25L (20% of 1.25L): ₹25,000
   - Tax before cess: ₹1,45,000.
   - Cess (4%): ₹5,800.
   - **Total Tax under New Regime: ₹1,50,800.**

2. **Old Tax Regime:**
   - Taxable Income: ₹18,00,000 - ₹2,25,000 = ₹15,75,000.
   - Slabs:
     - 0 to 2.5L: ₹0
     - 2.5L to 5L (5%): ₹12,500
     - 5L to 10L (20%): ₹1,00,000
     - 10L to 15.75L (30% of 5.75L): ₹1,72,500
   - Tax before cess: ₹2,85,000.
   - Cess (4%): ₹11,400.
   - **Total Tax under Old Regime: ₹2,96,400.**

**Verdict:** The New Tax Regime saves **₹1,45,600 in net cash** annually. Sticking to the Old Regime without massive HRA or home loan interest constitutes a direct wealth drag.

---

## 5. Arjun's Case File: Navigating Regime Choice

::: casefile-arjun
### Facts
- Gross Salary: ₹9,60,000 per annum (₹80,000 monthly).
- Rent Paid in Bengaluru: ₹18,000/month.
- ELSS Investments: ₹50,000.

### Analysis & Action
1. **Under New Regime:**
   - Taxable Income: ₹9,60,000 - ₹75,000 (Standard Deduction) = ₹8,85,000.
   - Since ₹8,85,000 is under the ₹12,00,000 threshold, **Section 87A rebate reduces total tax liability to ₹0**.
2. **Under Old Regime:**
   - Even with HRA exemption and Section 80C deductions, Arjun would pay between ₹15,000 and ₹35,000 in net tax.
3. **Strategic Decision:**
   - Arjun chooses the New Tax Regime. His net tax is zero, eliminating any requirement to lock capital into 3-year ELSS or tax-saving FDs solely for tax relief. He redirects that ₹50,000 into a liquid emergency reserve.
:::
