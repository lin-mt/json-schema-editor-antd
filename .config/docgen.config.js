/**
 * @param config {import('arco-scripts').DocgenConfig}
 */
module.exports = (config) => {
  config.entry = 'src';
  // DON'T change output!!!
  config.output = 'docs/README.md';
  config.tsParseTool = ['ts-document'];
  config.demoGlob = 'demo/index.js';
};
