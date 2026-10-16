import fs from 'fs';
import path from 'path';

// Keywords or pattern rules to detect accidental real PII or sensitive patterns
const FORBIDDEN_PATTERNS = [
  /([a-zA-Z0-9_\-\.]+)@(?!example\.com|investiq\.internal)[a-zA-Z0-9_\-\.]+\.[a-zA-Z]{2,5}/g, // non-example emails
  /\b(?:\+?91[\-\s]?)?[6789]\d{9}\b/g, // Indian mobile numbers
  /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/g, // Indian PAN cards (real patterns)
  /\b\d{4}[\-\s]?\d{4}[\-\s]?\d{4}\b/g // Aadhaar-like 12 digit numbers
];

const SCAN_DIRS = ['src', 'content', 'data', 'registry', 'public'];
let violations = 0;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        scanDir(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.md', '.json', '.astro', '.ts', '.tsx', '.js', '.html', '.txt'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        FORBIDDEN_PATTERNS.forEach((pattern) => {
          const matches = content.match(pattern);
          if (matches) {
            console.error(`[PRIVACY VIOLATION] File: ${fullPath} matched pattern: ${pattern}`);
            violations += matches.length;
          }
        });
      }
    }
  }
}

console.log('Running automated public-output privacy scanner...');
SCAN_DIRS.forEach(scanDir);

if (violations > 0) {
  console.error(`Privacy Scan FAILED with ${violations} violation(s). Build aborted.`);
  process.exit(1);
} else {
  console.log('Privacy Scan PASSED: Zero private personal identifiers or sensitive credentials found.');
  process.exit(0);
}
