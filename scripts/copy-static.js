#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '..', 'public');
const destDir = path.resolve(__dirname, '..', 'dist');

function copyFile(sourcePath, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(sourcePath, destPath);
}

function copyDirectory(from, to) {
  const entries = fs.readdirSync(from, { withFileTypes: true });
  entries.forEach((entry) => {
    const sourcePath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else if (entry.isFile()) {
      copyFile(sourcePath, destPath);
    }
  });
}

if (!fs.existsSync(sourceDir)) {
  console.error('Static directory not found:', sourceDir);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
copyDirectory(sourceDir, destDir);
console.log('Copied static assets to dist/.');
