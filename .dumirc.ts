import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  alias: {
    src: './src',
  },
  base: '/json-schema-editor-antd/',
  publicPath: '/json-schema-editor-antd/',
  themeConfig: {
    name: 'Quiet',
    socialLinks: {
      github: 'https://github.com/lin-mt/json-schema-editor-antd',
    },
  },
});
