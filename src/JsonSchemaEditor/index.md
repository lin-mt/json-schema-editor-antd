# JsonSchemaEditor

- 1.x.x 版本的代码已完全重构。
- 需要与 [json-schema-editor-visual](https://github.com/Open-Federation/json-schema-editor-visual) UI 布局类似的组件，可以使用
  `0.x.x` 版本。

```shell
yarn add @quiet-front-end/json-schema-editor-antd
```

```jsx
import { JsonSchemaEditor } from '@quiet-front-end/json-schema-editor-antd';

export default () => <JsonSchemaEditor />;
```

## Notice

组件中的 JSON 编辑器用的是加载 cdn 的方式，离线使用需添加 [monaco-editor](https://github.com/microsoft/monaco-editor)

```shell
yarn add monaco-editor
```

加载 monaco-editor

```jsx ｜ pure
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

loader.config({ monaco });
```

## API

| 参数名称 | 描述                  | 类型                               | 默认值                                                            |
| -------- | --------------------- | ---------------------------------- | ----------------------------------------------------------------- |
| onChange | JsonSchema 变更的回调 | (schema: JSONSchema7) => void      | -                                                                 |
| data     | 初始化组件数据        | JSONSchema7 \| string \| undefined | `{"type": "object", "properties": {"field": {"type": "string"}}}` |
