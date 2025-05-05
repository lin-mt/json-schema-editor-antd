import Editor, { OnChange } from '@monaco-editor/react';
import { theme } from 'antd';
import React, { ReactElement } from 'react';
import { xcodeDefault } from './themes';

interface MonacoEditorProp {
  width?: string | number;
  height?: string | number;
  value?: string;
  language?: string;
  readOnly?: boolean;
  lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
  folding?: boolean;
  renderLineHighlight?: 'all' | 'line' | 'none' | 'gutter';
  onChange?: OnChange;
  handleEditorDidMount?: (editor: any, monaco: any) => void;
}

const MonacoEditor = (props: MonacoEditorProp): ReactElement => {
  const {
    width,
    lineNumbers = 'on',
    height,
    value,
    folding = true,
    language,
    readOnly = false,
    renderLineHighlight = 'all',
    onChange,
  } = props;

  const { token } = theme.useToken();

  function editorWillMount(monaco: any) {
    monaco.editor.defineTheme('x-code-default', xcodeDefault);
  }

  return (
    <div
      style={{
        border: `1px solid ${token.colorBorder}`,
        width: width ? width : '100%',
      }}
    >
      <Editor
        height={height}
        width={width}
        value={value}
        language={language}
        onChange={onChange}
        onMount={props.handleEditorDidMount}
        beforeMount={editorWillMount}
        theme="x-code-default"
        options={{
          // 只读
          readOnly,
          // 关闭行数显示
          lineNumbers,
          // 关闭选中行的渲染
          renderLineHighlight,
          // 是否折叠
          folding,
          smoothScrolling: true,
          // 编辑器中字体大小
          fontSize: 13,
          // 是否可以滚动到最后一行，可以往上滚动超出内容范围
          scrollBeyondLastLine: false,
          // 左边空出来的宽度
          // lineDecorationsWidth: 5,
          // lineNumbersMinChars: 3,
          // 滚动条样式
          scrollbar: {
            verticalScrollbarSize: 9,
            horizontalScrollbarSize: 9,
          },
          // 小地图
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
};

export default MonacoEditor;
