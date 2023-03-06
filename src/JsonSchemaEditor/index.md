# JsonSchemaEditor

```shell
yarn add @quiet-front-end/json-schema-editor-antd
```

```jsx
import { JsonSchemaEditor } from '@quiet-front-end/json-schema-editor-antd';

export default () => <JsonSchemaEditor />;
```

## Notice

```shell
npm install monaco-editor
```

组件中的 JSON 编辑器用的是在线加载 cdn 的方式，离线使用需添加以下内容

```jsx ｜ pure
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
loader.config({ monaco });
```

## API

| 参数名称   | 描述                 | 类型                     | 默认值 |
| ---------- | -------------------- | ------------------------ | ------ |
| mock       | 是否开启 mock        | boolean                  | -      |
| jsonEditor | 是否展示 json 编辑器 | boolean                  | -      |
| onChange   | Schema 变更的回调    | (schema: Schema) => void | -      |
| data       | 初始化 Schema        | Schema or string         | -      |
