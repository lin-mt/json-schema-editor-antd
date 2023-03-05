import React, { ReactElement } from 'react';
import Schema from '../../types/Schema';
interface EditorContextProp {
    changeCustomValue: (newValue: Schema) => void;
    mock?: boolean;
}
export declare const EditorContext: React.Context<EditorContextProp>;
interface EditorProp {
    jsonEditor?: boolean;
    mock?: boolean;
}
declare const Editor: (props: EditorProp) => ReactElement;
export default Editor;
