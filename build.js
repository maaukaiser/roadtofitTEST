const fs = require('fs');
const path = require('path');

const wwwDir = path.join(__dirname, 'www');

// Ensure www exists
if (!fs.existsSync(wwwDir)) {
  fs.mkdirSync(wwwDir);
}

const copyRecursiveSync = (src, dest) => {
  if (fs.existsSync(src)) {
    const stats = fs.statSync(src);
    const isDirectory = stats.isDirectory();
    if (isDirectory) {
      if (!fs.existsSync(dest)) fs.mkdirSync(dest);
      fs.readdirSync(src).forEach((childItemName) => {
        copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
};

// Files and folders to copy to www
const items = ['index.html', 'css', 'js', 'icons', 'manifest.json', 'sw.js'];

items.forEach(item => {
  const src = path.join(__dirname, item);
  const dest = path.join(wwwDir, item);
  try {
    copyRecursiveSync(src, dest);
    console.log(`Copied ${item} to www/`);
  } catch (e) {
    console.log(`Failed to copy ${item}: ${e.message}`);
  }
});

console.log('Build to www complete!');
