const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filelist.push(path.join(dir, file));
      }
    }
  });
  return filelist;
};

const files = walkSync('./app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+['"]@\/components\/uI\/[a-zA-Z0-9_]+['"];?/g;
  
  let match;
  let components = [];
  let firstIndex = -1;
  let lastIndex = -1;
  let matches = [];

  while ((match = importRegex.exec(content)) !== null) {
    if (firstIndex === -1) firstIndex = match.index;
    lastIndex = match.index + match[0].length;
    components.push(match[1]);
    matches.push(match[0]);
  }

  if (components.length > 0) {
    // Remove all old imports
    matches.forEach(m => {
      content = content.replace(m + '\n', '').replace(m, '');
    });
    
    // Insert new combined import at the position of the first import
    const newImport = `import { ${components.join(', ')} } from '@/components/uI';\n`;
    content = content.slice(0, firstIndex) + newImport + content.slice(firstIndex);
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
