const fs = require('fs');
const path = require('path');

// Read the broken JSON
const filePath = 'data/modules/modulo-7.json';
let content = fs.readFileSync(filePath, 'utf-8');

// Strategy: parse the file by tracking strings properly
// and escaping only the newlines that appear INSIDE strings

let result = '';
let inString = false;
let escapeNext = false;

for (let i = 0; i < content.length; i++) {
  const ch = content[i];

  if (escapeNext) {
    escapeNext = false;
    result += ch;
    continue;
  }

  if (ch === '\\') {
    escapeNext = true;
    result += ch;
    continue;
  }

  if (ch === '"') {
    inString = !inString;
    result += ch;
    continue;
  }

  if (inString && (ch === '\n' || ch === '\r')) {
    if (ch === '\n') {
      result += '\\n';
    }
    // skip \r
    continue;
  }

  result += ch;
}

// Validate
try {
  JSON.parse(result);
  console.log('✅ JSON now valid!');
  
  // Write back
  fs.writeFileSync(filePath, result, 'utf-8');
  console.log('✅ File written successfully');
} catch (e) {
  console.error('❌ Still invalid:', e.message);
  const match = e.message.match(/position (\d+)/);
  if (match) {
    const pos = parseInt(match[1]);
    const start = Math.max(0, pos - 100);
    const end = Math.min(result.length, pos + 100);
    console.log('Around position:', JSON.stringify(result.substring(start, end)));
  }
}
