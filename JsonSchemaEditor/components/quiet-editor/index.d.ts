import { OnChange } from '@monaco-editor/react';
import { ReactElement } from 'react';
interface QuietEditorProp {
    width?: string | number;
    height?: string | number;
    value?: string;
    language?: string;
    readOnly?: boolean;
    lineNumbers?: 'on' | 'off' | 'relative' | 'interval';
    folding?: boolean;
    renderLineHighlight?: 'all' | 'line' | 'none' | 'gutter';
    onChange?: OnChange;
}
declare const QuietEditor: (props: QuietEditorProp) => ReactElement;
export default QuietEditor;
