import React, { ReactElement } from 'react';
import './index.less';
import Schema from './types/Schema';
import SchemaDescription from './types/SchemaDescription';
/**
 * @title JsonSchemaEditor
 */
export interface JsonSchemaEditorProps {
    /**
     * @zh 是否开启 mock
     */
    mock?: boolean;
    /**
     * @zh 是否展示 json 编辑器
     */
    jsonEditor?: boolean;
    /**
     * @zh Schema 变更的回调
     */
    onChange?: (schema: Schema) => void;
    /**
     * @zh 初始化 Schema
     */
    data?: Schema | string;
}
export declare const SchemaMobxContext: React.Context<SchemaDescription>;
declare const JsonSchemaEditor: (props: JsonSchemaEditorProps) => ReactElement;
export default JsonSchemaEditor;
