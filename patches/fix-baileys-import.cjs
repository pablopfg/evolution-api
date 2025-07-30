const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '..', 'node_modules', 'baileys', 'lib', 'Socket', 'communities.js'),
  path.join(__dirname, '..', 'node_modules', 'baileys', 'lib', 'Socket', 'communities.d.ts'),
];

for (const file of files) {
  try {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const updated = content.replace("../../WAProto", "../../WAProto/index.js");
      if (updated !== content) {
        fs.writeFileSync(file, updated);
        console.log(`patched ${file}`);
      }
    }
  } catch (err) {
    console.error(`failed to patch ${file}:`, err);
  }
}
