# Json Schema 可视化编辑器（Antd）

[![npm](https://img.shields.io/npm/v/@quiet-front-end/json-schema-editor-antd.svg)](https://www.npmjs.com/package/@quiet-front-end/json-schema-editor-antd)
[![total](https://img.shields.io/npm/dt/@quiet-front-end/json-schema-editor-antd.svg)](https://img.shields.io/npm/dt/@quiet-front-end/json-schema-editor-antd.svg)
![](https://img.shields.io/badge/license-MIT-000000.svg)

[Antd Design](https://ant.design/) 风格的 Json Schema 可视化编辑器。

[Arco Design](https://arco.design/) 风格：https://github.com/lin-mt/json-schema-editor-arco

## 快速开始

```
# 开发
npm run dev

# 构建
npm run build

# 发布前预览
npm run prepublishOnly && arco preview

# 发布至物料平台（需先发布 NPM 包）
arco sync
```

## 示例

```shell
npm install @quiet-front-end/json-schema-editor-antd
```

```jsx
import { useState } from "react";
import JsonSchemaEditor from '@quiet-front-end/json-schema-editor-antd';
import '@quiet-front-end/json-schema-editor-antd/dist/css/index.css';

export default () => {

  const [jsonData, setJsonData] = useState({});

  return (
    <JsonSchemaEditor
      mock={true}
      data={jsonData}
      onChange={(data) => {
        setJsonData(data);
      }}
    />
  )
}
```

![示例](./image/img.png)

## 离线使用编辑器

项目中的代码编辑器用的是在线加载 cdn 的方式，离线使用需自行添加以下内容

```shell
npm install monaco-editor
```

```jsx
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

loader.config({ monaco });
```