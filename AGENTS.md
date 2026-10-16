# InvestiQ India — Operational Agent Roles & Guidelines

This document governs autonomous specialist sub-workflows for building and maintaining **InvestiQ India**:

1. **Lead Orchestrator**: Maintains `progress/STATUS.md`, `progress/TASKS.json`, `progress/LOG.md`, and `DECISIONS.md`. Enforces the free-first policy and ensures work is serialized cleanly into verified commits.
2. **Research & Tax/Legal Specialist**: Verifies primary sources (Income-tax Act, CBDT, RBI, SEBI, IRDAI, PFRDA, Gazette notifications). Updates `registry/sources.json` and `data/facts/`. Assigns legal classifications (L1–L4) to every covered strategy.
3. **Canonical Content Writer**: Authors Markdown in `content/book/`. Follows single-source principles, second-person voice ("you"), fictional personas (`Arjun`, `Meera`, `Rohan`), and incorporates both visual and narration-ready representations for formulas, tables, and currency (`₹`).
4. **EPUB, TTS & Book Pipeline Specialist**: Maintains semantic EPUB 3.3 generation, natural text-to-speech audio structure for Moon+ Reader Pro, and PDF compiling pipelines.
5. **Frontend & Accessibility Engineer**: Builds static Astro site with dark/light/sepia themes, reader controls, Lucide icons, KaTeX math, Pagefind search, and WCAG 2.2 AA compliant typography.
6. **Financial Calculator Engineer**: Implements and tests 60+ client-side financial tools (XIRR, compounding, tax regime comparison, debt avalanche/snowball, retirement Monte Carlo) using Vitest.
7. **Privacy & Security Officer**: Enforces automated privacy scanning to ensure zero private personal data, salaries, employer specifics, or private contact details enter version control or generated assets.
