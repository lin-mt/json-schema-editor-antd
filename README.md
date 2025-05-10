# @flodejs/json-schema-editor-antd

[![NPM version](https://img.shields.io/npm/v/@flodejs/json-schema-editor-antd.svg?style=flat)](https://npmjs.org/package/@flodejs/json-schema-editor-antd)
[![NPM downloads](http://img.shields.io/npm/dm/@flodejs/json-schema-editor-antd.svg?style=flat)](https://npmjs.org/package/@flodejs/json-schema-editor-antd)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[Antd Design](https://ant.design/) 风格的 Json Schema 可视化编辑器。

[Arco Design](https://arco.design/) 风格：https://github.com/lin-mt/json-schema-editor-arco

## Usage

```shell
npm install @flodejs/json-schema-editor-antd
```

```jsx
import { useState } from 'react';
import JsonSchemaEditor from '@flodejs/json-schema-editor-antd';

export default () => {
  const [jsonSchema, setJsonSchema] = useState();
  return (
    <JsonSchemaEditor
      value={jsonSchema}
      onChange={(schema) => {
        setJsonSchema(schema);
      }}
    />
  );
};
```

## Development

```bash
# install dependencies
$ yarn install

# develop library by docs demo
$ yarn start

# build library source code
$ yarn run build

# build library source code in watch mode
$ yarn run build:watch

# build docs
$ yarn run docs:build

# Locally preview the production build.
$ yarn run docs:preview

# check your project for potential problems
$ yarn run doctor
```

## LICENSE

MIT
