import fs from 'fs';
import path from 'path';

console.log('Compiling InvestiQ India Master Book into standalone downloadable editions...');

const downloadsDir = path.resolve('public/downloads');
if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// Collect all markdown sections from content/book
const bookDir = path.resolve('content/book');
let allSections = [];

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      allSections.push(full);
    }
  }
}

if (fs.existsSync(bookDir)) {
  walkDir(bookDir);
}

allSections.sort();

console.log(`Found ${allSections.length} canonical book section(s) to compile.`);

// 1. Build Single Plain-Text Master Edition
let masterTxt = `================================================================================
INVESTIQ INDIA: THE COMPLETE GUIDE TO EARNING, INVESTING, PROTECTING & TRANSFERRING WEALTH
Edition: FY 2026-27 Compliant | Author: Chirag Singhal
Licence: CC BY-NC-SA 4.0 | Non-Commercial Educational Reference
================================================================================

DISCLAIMER:
This work is for educational purposes only and does not constitute certified
financial, legal, investment, or tax advice. Always consult certified fiduciaries.

TABLE OF CONTENTS & CHAPTER CORPUS:
`;

let masterHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>InvestiQ India — Master Book (Complete Edition)</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; line-height: 1.7; max-width: 850px; margin: 3rem auto; padding: 0 1.5rem; color: #1f2937; background: #ffffff; }
    h1 { font-size: 2.4rem; color: #111827; border-bottom: 3px solid #2563eb; padding-bottom: 0.5rem; margin-top: 2rem; }
    h2 { font-size: 1.6rem; color: #1e40af; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.3rem; margin-top: 2rem; }
    h3 { font-size: 1.25rem; color: #374151; margin-top: 1.5rem; }
    table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95rem; }
    th, td { border: 1px solid #d1d5db; padding: 0.6rem 0.8rem; text-align: left; }
    th { background: #f3f4f6; font-weight: 600; }
    .casefile { background: #f0fdf4; border: 1px solid #bbf7d0; border-left: 5px solid #16a34a; padding: 1.25rem; border-radius: 6px; margin: 1.5rem 0; }
    .metadata { color: #6b7280; font-size: 0.9rem; margin-bottom: 1.5rem; }
    hr { border: none; border-top: 2px solid #e5e7eb; margin: 3rem 0; }
    @media print {
      body { max-width: 100%; margin: 1cm; color: #000; }
      .casefile { border-color: #000; }
    }
  </style>
</head>
<body>
  <h1>InvestiQ India</h1>
  <p><strong>The Complete Guide to Earning, Investing, Protecting and Passing On Wealth in India</strong></p>
  <div class="metadata">
    <p>Author: Chirag Singhal | FY 2026-27 Compliant | Formats: HTML, EPUB 3.3, Plain Text</p>
    <p>Disclaimer: For non-commercial educational purposes only. Does not constitute registered investment or tax advice.</p>
  </div>
  <hr/>
`;

for (const secPath of allSections) {
  const content = fs.readFileSync(secPath, 'utf8');
  const match = content.match(/^---([\s\S]*?)---([\s\S]*)$/);
  const frontmatter = match ? match[1] : '';
  const prose = match ? match[2].trim() : content.trim();

  // Extract title
  const titleMatch = frontmatter.match(/title:\s*"(.*?)"/);
  const title = titleMatch ? titleMatch[1] : path.basename(secPath);

  masterTxt += `\n\n--------------------------------------------------------------------------------\n${title.toUpperCase()}\n--------------------------------------------------------------------------------\n\n${prose}\n`;

  // HTML rendering
  masterHtml += `\n<article>\n<h1>${title}</h1>\n<div>\n${prose
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/::: casefile-arjun/g, '<div class="casefile"><strong>Arjun\'s Case File:</strong>')
    .replace(/:::/g, '</div>')
    .replace(/\n\n/g, '<p>')}\n</div>\n</article>\n<hr/>\n`;
}

masterHtml += `\n<footer><p style="text-align:center; color:#6b7280;">InvestiQ India &copy; 2026 | Chirag Singhal | End of Master Volume</p></footer></body></html>`;

// Write outputs to public/downloads/
const txtPath = path.join(downloadsDir, 'InvestiQ-India-Master-Book.txt');
const htmlPath = path.join(downloadsDir, 'InvestiQ-India-Master-Book.html');
const epubPreviewPath = path.join(downloadsDir, 'InvestiQ-India-Master-TTS.xhtml');

fs.writeFileSync(txtPath, masterTxt, 'utf8');
fs.writeFileSync(htmlPath, masterHtml, 'utf8');
fs.writeFileSync(epubPreviewPath, masterHtml, 'utf8');

// Generate manifest
const manifest = {
  edition: "2026.10-FY2627",
  buildDate: new Date().toISOString(),
  canonicalSectionsCount: allSections.length,
  downloads: [
    {
      name: "InvestiQ-India-Master-Book.html",
      title: "Master Book (Self-Contained Standalone HTML / Printable)",
      sizeBytes: fs.statSync(htmlPath).size,
      format: "HTML"
    },
    {
      name: "InvestiQ-India-Master-Book.txt",
      title: "Master Book (UTF-8 Plain Text for Screen Readers & Offline)",
      sizeBytes: fs.statSync(txtPath).size,
      format: "TXT"
    },
    {
      name: "InvestiQ-India-Master-TTS.xhtml",
      title: "Narration Edition (Moon+ Reader Pro TTS Compatible)",
      sizeBytes: fs.statSync(epubPreviewPath).size,
      format: "XHTML/EPUB"
    }
  ]
};

fs.writeFileSync(path.join(downloadsDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

console.log('Successfully compiled master downloads:');
console.log(`- HTML: ${htmlPath} (${manifest.downloads[0].sizeBytes} bytes)`);
console.log(`- TXT:  ${txtPath} (${manifest.downloads[1].sizeBytes} bytes)`);
console.log(`- TTS:  ${epubPreviewPath} (${manifest.downloads[2].sizeBytes} bytes)`);
