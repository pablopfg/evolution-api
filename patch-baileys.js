import fs from 'fs';
import path from 'path';

const patches = [
  {
    file: path.join('node_modules', 'baileys', 'lib', 'Socket', 'communities.js'),
    search: "from '../../WAProto';",
    replace: "from '../../WAProto/index.js';",
  },
  {
    file: path.join('node_modules', 'baileys', 'lib', 'Socket', 'communities.d.ts'),
    search: "from '../../WAProto';",
    replace: "from '../../WAProto/index.js';",
  }
];

for (const { file, search, replace } of patches) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(search)) {
      content = content.replace(search, replace);
      fs.writeFileSync(file, content);
      console.log(`Patched ${file}`);
    } else {
      console.log(`No patch needed for ${file}`);
    }
  } catch (err) {
    console.error(`Failed to patch ${file}:`, err);
  }
}
