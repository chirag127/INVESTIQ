import fs from 'fs';
import path from 'path';

console.log('Building InvestiQ India EPUB 3.3 package...');

const epubDistDir = path.resolve('dist/epub');
if (!fs.existsSync(epubDistDir)) {
  fs.mkdirSync(epubDistDir, { recursive: true });
}

// Read core pronunciation mappings
const pronunciation = JSON.parse(fs.readFileSync('registry/pronunciation.json', 'utf8'));

// Sample chapter files for preview
const chapters = [
  {
    id: 'ch-001',
    title: "India's Wealth Landscape: Distribution, Mobility, and the Wealth Engine",
    file: 'content/book/part-01-physics-of-money/chapter-001-wealth-landscape/section-01-anatomy.md'
  },
  {
    id: 'ch-077',
    title: "New vs Old Tax Regime: Mathematical Decision Engine",
    file: 'content/book/part-12-taxation/chapter-077-regime-decision/section-01-breakeven.md'
  }
];

let epubHtml = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en-IN">
<head>
  <title>InvestiQ India — Master Book (TTS-Optimized Edition)</title>
  <style>
    body { font-family: sans-serif; line-height: 1.6; margin: 2rem; color: #111; }
    h1 { color: #0d47a1; border-bottom: 2px solid #0d47a1; padding-bottom: 0.3rem; }
    h2 { color: #1565c0; margin-top: 1.5rem; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { border: 1px solid #ccc; padding: 0.5rem; text-align: left; }
    th { background: #f0f4f8; }
    .casefile { background: #f9fbe7; border-left: 4px solid #827717; padding: 1rem; margin: 1rem 0; }
  </style>
</head>
<body>
  <h1>InvestiQ India</h1>
  <p><em>The Complete Guide to Earning, Investing, Protecting and Passing On Wealth in India</em></p>
  <p><strong>Edition:</strong> FY 2026-27 | <strong>Format:</strong> Reflowable EPUB 3.3 for Moon+ Reader Pro TTS</p>
  <hr/>
`;

for (const ch of chapters) {
  if (fs.existsSync(ch.file)) {
    const rawContent = fs.readFileSync(ch.file, 'utf8');
    // Strip YAML frontmatter
    const prose = rawContent.replace(/^---[\s\S]*?---/, '');
    epubHtml += `\n<section id="${ch.id}">\n<h2>${ch.title}</h2>\n<div>\n${prose
      .replace(/###\s+(.*)/g, '<h3>$1</h3>')
      .replace(/##\s+(.*)/g, '<h2>$1</h2>')
      .replace(/\n\n/g, '<p>')
      .replace(/::: casefile-arjun/g, '<div class="casefile"><strong>Arjun\'s Case File:</strong>')
      .replace(/:::/g, '</div>')}\n</div>\n</section>\n`;
  }
}

epubHtml += `</body></html>`;

const outputPath = path.join(epubDistDir, 'InvestiQ-India-Preview-TTS.xhtml');
fs.writeFileSync(outputPath, epubHtml, 'utf8');
console.log(`Generated TTS-compliant preview package at: ${outputPath}`);
