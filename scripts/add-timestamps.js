import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, '..', 'src', 'content', 'docs');

function getAllMdFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...getAllMdFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

function formatTimestamp(date) {
  const dateStr = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = date.toLocaleTimeString('en-US', { hour12: false });
  return `*Last update: ${dateStr} ${timeStr}*`;
}

function parseTimestamp(content) {
  const match = content.match(/\*Last update: (.+?)\*/);
  if (match) {
    const dateStr = match[1];
    return new Date(dateStr);
  }
  return null;
}

const files = getAllMdFiles(docsDir);

files.forEach(file => {
  const stat = fs.statSync(file);
  const mtime = stat.mtime;
  const content = fs.readFileSync(file, 'utf-8');
  const currentTimestamp = parseTimestamp(content);
  const newTimestampStr = formatTimestamp(mtime);

  if (!currentTimestamp || currentTimestamp.getTime() !== mtime.getTime()) {
    let newContent;
    if (content.includes('*Last update:')) {
      // Replace existing
      newContent = content.replace(/\*Last update: .+\*/, newTimestampStr);
    } else {
      // Append
      newContent = content + '\n\n---\n\n' + newTimestampStr;
    }
    fs.writeFileSync(file, newContent);
    console.log(`Updated timestamp in ${file} to ${newTimestampStr}`);
  } else {
    console.log(`No change needed for ${file}`);
  }
});

console.log('Done updating timestamps.');