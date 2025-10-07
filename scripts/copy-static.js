#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const destDir = path.resolve(projectRoot, 'dist');

const staticFiles = ['index.html'];

function copyFile(sourcePath, destPath) {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(sourcePath, destPath);
}

fs.mkdirSync(destDir, { recursive: true });

staticFiles.forEach((relativePath) => {
  const sourcePath = path.resolve(projectRoot, relativePath);
  const destPath = path.resolve(destDir, relativePath);

  if (!fs.existsSync(sourcePath)) {
    console.error('Static asset not found:', sourcePath);
    process.exitCode = 1;
    return;
  }

  copyFile(sourcePath, destPath);
});

if (process.exitCode === 1) {
  console.error('One or more static assets failed to copy.');
  process.exit(1);
}

console.log('Copied static assets to dist/.');
