const componentGenerator = require('./generators/component');
const containerGenerator = require('./generators/container');
const viewGenerator = require('./generators/view');

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator);
  plop.setGenerator('container', containerGenerator);
  plop.setGenerator('view', viewGenerator);
};
