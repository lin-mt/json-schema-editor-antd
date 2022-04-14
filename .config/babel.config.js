const fs = require('fs');
const path = require('path');
const { getGitRootPath } = require('arco-cli-dev-utils');

/**
 * @param config {import('arco-scripts').BabelConfig}
 */
module.exports = (config) => {
  const rootConfigPath = path.resolve(getGitRootPath(), 'arco.scripts.config.js');

  if (fs.existsSync(rootConfigPath)) {
    const { babel } = require(rootConfigPath);
    config = babel(config) || config;
  }
};
