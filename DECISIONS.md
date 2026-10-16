# DECISIONS LOG — INVESTIQ INDIA

## D-001: Environment & Surface Verification (2026-10-17)
- **Host System**: Windows with PowerShell (`pwsh`), Node.js `v26.4.0`, npm `12.0.2`, Python `3.14.6`.
- **Git & GitHub**: Verified logged-in account `chirag127`. Repository `origin` set to `https://github.com/chirag127/INVESTIQ.git`.
- **GitHub Pages Canonical URL Target**: `https://chirag127.github.io/INVESTIQ/` (base path `/INVESTIQ/`).
- **Free-First Policy Enforcement**: No paid APIs, external hosted databases, or paid model routing. Standalone build pipelines using open-source tools with CI-based Pandoc/Typst/Node engines on GitHub-hosted Ubuntu runners (`ubuntu-latest`).
- **Local PDF/EPUB Pipeline**: Since Pandoc and Typst are not pre-installed on this Windows host, our build architecture uses Node/Python native EPUB/HTML/TXT generators locally, while delegating heavy TeX/Typst PDF builds to CI and containerized/standalone runner scripts.

## D-002: Framework & Tooling Selection (2026-10-17)
- **Web Framework**: Astro 5+ static site generator with Tailwind/Vanilla CSS tokens, Lucide icons, KaTeX math rendering, Pagefind search indexing, and client-side interactive calculators (React/Preact islands or vanilla TS).
- **Canonical Content Hierarchy**: All educational chapters are authored once in `content/book/part-XX/chapter-NNN/` as markdown with YAML frontmatter.
- **Narrative & TTS Architecture**: EPUB 3.3 specification with semantic W3C TTS Enhancements. Natural text conversion for formulas, tables, and currency (`₹` / lakh / crore).
- **Persona Boundary & Privacy**: Strictly fictional personas (`Arjun`, `Meera`, `Rohan`). No real personal accounts, salaries, family net worth, or private contacts will ever be committed or published. Fictional examples only.
- **License**: Code under MIT License; Educational text under CC BY-NC-SA 4.0.
