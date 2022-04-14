# Arco 物料项目

[物料平台文档中心](https://arco.design/docs/material/guide)

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

## 提供 Demo

Demo 目录位于 `src/demo`。你可以在此目录中加入多个 Demo，它们将被展示在物料平台的预览页。在 `src/demo/index.js` 中，通过 JSDoc 的语法提供物料及各个 Demo 的相关信息。

```javascript
// src/demo/index.js

/**
 * @file
 * @title 名称
 * @memberOf 数据录入
 * @description 一段对于物料的描述。
 * @author 物料作者
 */

/**
 * @title 基础用法
 * @description 一个物料最基本的使用方式。
 */
export { default as Basic } from './basic';
```

## API 文档

**为了帮助他人更好地使用你的组件，请提供详细的 API 文档。**

### 书写注释

我们提供了自动化的文档生成工具，它从 TS 接口定义中提取注释自动生成属性文档。按照以下指引使用，为接口书写 tsDoc 类型的注释：

```typescript
/**
 * @title Button (必填，带有 `title` 描述的接口或者类型才会被收集)
 */
interface ButtonProps {
  /**
   * @zh 按钮尺寸 (属性的中文描述)
   * @en Size of Button (属性的英文描述)
   * @version 1.2.0 (可选，新增的属性在哪个版本开始支持)
   * @defaultValue 'default' (可选，属性的默认值)
   */
  size?: 'mini' | 'small' | 'default' | 'large';
  /**
   * @zh 按钮状态
   * @en Status of Button
   */
  status?: 'danger' | 'error' | 'success';
}
```

### 扩展 TEMPLATE.md

`TEMPLATE.md` 是用于自动文档生成的模板，你可以修改此文件添加更多组件的使用帮助信息，但请不要删除其原有的内容，否则可能导致内容替换失败。

```markdown
// TEMPLATE.md
---
file: index,interface (可以指定多个文档提取的入口文件，使用逗号隔开)
---

# TooltipButton

## 属性/Props

%%Props%%

### OtherProps

在这里你可以书写更多组件帮助文档。

## Demos

%%Demos%%
```

## 测试

测试目录位于 `src/__test__`。你可以在 `index.test.tsx` 中编写你的测试用例。

`npm run test` 命令允许你传入任何 `jest` 的命令行参数，例如 `npm run test -- --u` `npm run test -- --no-cache`。
