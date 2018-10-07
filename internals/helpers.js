const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

/**
 * Adds mark check symbol
 */
function addCheckMark(callback) {
  process.stdout.write(chalk.green(' ✓'));
  if (callback) callback();
}

function componentExists(comp) {
  const pageComponents = fs.readdirSync(
    path.join(__dirname, '../src/components'),
  );
  const pageContainers = fs.readdirSync(
    path.join(__dirname, '../src/containers'),
  );
  const components = pageComponents.concat(pageContainers);

  return components.indexOf(comp) >= 0;
}

module.exports = {
  addCheckMark,
  componentExists
};
