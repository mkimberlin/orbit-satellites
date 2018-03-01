const fs = require('fs');
const packageJson = require('./package.json');

const version = {
  name: packageJson.name,
  version: packageJson.version
};

if (process.env.TESTING === 'true') {
  version.version = '0.0.0';
}

fs.writeFileSync('./src/version.json', JSON.stringify(version), 'utf-8');
