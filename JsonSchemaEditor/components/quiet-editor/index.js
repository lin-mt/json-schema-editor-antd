import Editor from '@monaco-editor/react';
import React from 'react';
import { xcodeDefault } from "./themes";
var QuietEditor = function QuietEditor(props) {
  var width = props.width,
    _props$lineNumbers = props.lineNumbers,
    lineNumbers = _props$lineNumbers === void 0 ? 'on' : _props$lineNumbers,
    height = props.height,
    value = props.value,
    _props$folding = props.folding,
    folding = _props$folding === void 0 ? true : _props$folding,
    language = props.language,
    _props$readOnly = props.readOnly,
    readOnly = _props$readOnly === void 0 ? false : _props$readOnly,
    _props$renderLineHigh = props.renderLineHighlight,
    renderLineHighlight = _props$renderLineHigh === void 0 ? 'all' : _props$renderLineHigh,
    onChange = props.onChange;
  function editorWillMount(monaco) {
    monaco.editor.defineTheme('x-code-default', xcodeDefault);
  }
  return /*#__PURE__*/React.createElement(Editor, {
    height: height,
    width: width,
    value: value,
    language: language,
    onChange: onChange,
    beforeMount: editorWillMount,
    theme: "x-code-default",
    options: {
      // 只读
      readOnly: readOnly,
      // 关闭行数显示
      lineNumbers: lineNumbers,
      // 关闭选中行的渲染
      renderLineHighlight: renderLineHighlight,
      // 是否折叠
      folding: folding,
      smoothScrolling: true,
      // 编辑器中字体大小
      fontSize: 13,
      // 是否可以滚动到最后一行，可以往上滚动超出内容范围
      scrollBeyondLastLine: false,
      // 左边空出来的宽度
      lineDecorationsWidth: 19,
      // 滚动条样式
      scrollbar: {
        verticalScrollbarSize: 5,
        horizontalScrollbarSize: 5
      },
      // 小地图
      minimap: {
        enabled: false
      }
    }
  });
};
export default QuietEditor;