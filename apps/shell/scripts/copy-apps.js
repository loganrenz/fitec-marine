#!/usr/bin/env node

/**
 * Build script to copy static apps from /apps/ to /apps/shell/public/apps/
 * This ensures we have a single source of truth for all apps
 */

import { cpSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const REPO_ROOT = join(__dirname, '../../..');
const APPS_SOURCE = join(REPO_ROOT, 'apps');
const APPS_DEST = join(__dirname, '../public/apps');

// Apps to copy (simple static apps)
const SIMPLE_APPS = ['coin-flip', 'dice-roller', 'fitec'];

// Apps that need to be built first (Vue apps)
const BUILD_APPS = ['emotion-music'];

console.log('🔄 Copying apps to shell/public/apps...\n');

// Clean destination first
if (existsSync(APPS_DEST)) {
  console.log('🧹 Cleaning existing apps directory...');
  rmSync(APPS_DEST, { recursive: true, force: true });
}

// Create destination directory
mkdirSync(APPS_DEST, { recursive: true });

// Copy simple static apps
SIMPLE_APPS.forEach(appName => {
  const sourcePath = join(APPS_SOURCE, appName);
  const destPath = join(APPS_DEST, appName);
  
  if (!existsSync(sourcePath)) {
    console.warn(`⚠️  Warning: ${appName} not found at ${sourcePath}`);
    return;
  }
  
  console.log(`📦 Copying ${appName}...`);
  cpSync(sourcePath, destPath, { recursive: true });
});

// Copy built Vue apps (from their dist directories)
BUILD_APPS.forEach(appName => {
  const sourcePath = join(APPS_SOURCE, appName, 'dist');
  const destPath = join(APPS_DEST, appName);
  
  if (!existsSync(sourcePath)) {
    console.warn(`⚠️  Warning: ${appName}/dist not found. Did you build it first?`);
    console.warn(`   Run: cd apps/${appName} && npm run build`);
    return;
  }
  
  console.log(`📦 Copying ${appName} (from dist)...`);
  cpSync(sourcePath, destPath, { recursive: true });
});

console.log('\n✅ Apps copied successfully!');
