const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const isMonorepo = fs.existsSync(path.resolve('lerna.json'));
const packagePaths = glob.sync(path.resolve(isMonorepo ? 'packages/*' : './'));

const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

function getLoaderForStyle(isCssModule) {
  return [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: isCssModule ? { modules: true } : {},
    },
    {
      loader: 'less-loader',
      options: {
        javascriptEnabled: true,
      },
    },
  ];
}

module.exports = {
  stories: [path.resolve(isMonorepo ? 'packages/*' : './', 'stories/*.@(js|jsx|ts|tsx)')],
  webpackFinal: (config) => {
    // 为 storybook 添加 packages 中项目的 alias
    packagePaths.forEach((_path) => {
      const pathSrc = path.resolve(_path, 'src');
      const pathComponents = path.resolve(_path, 'components');
      const packageJson = fs.readJsonSync(path.resolve(_path, 'package.json'));
      config.resolve.alias[`${packageJson.name}$`] = fs.existsSync(pathComponents)
        ? pathComponents
        : pathSrc;
    });

    // 支持 import less
    config.module.rules.push({
      test: lessRegex,
      exclude: lessModuleRegex,
      use: getLoaderForStyle(),
    });

    // less css modules
    config.module.rules.push({
      test: lessModuleRegex,
      use: getLoaderForStyle(true),
    });

    // 支持 import svg
    const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: ['@svgr/webpack'],
    });
    return config;
  },
};
