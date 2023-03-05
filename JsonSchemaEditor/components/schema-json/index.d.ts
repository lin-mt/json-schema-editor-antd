import React, { ReactElement } from 'react';
import Schema from '../../types/Schema';
export declare const mapping: (name: string[], data: Schema | undefined, showEdit: (prefix: string[], editorName: string, propertyElement: string | {
    mock: string;
}, type?: string) => void, showAdv: (prefix: string[], property?: Schema) => void) => React.ReactElement | null;
interface SchemaJsonProp {
    showEdit: (prefix: string[], editorName: string, propertyElement: string | {
        mock: string;
    }, type?: string) => void;
    showAdv: (prefix: string[], property?: Schema) => void;
}
declare const SchemaJson: (props: SchemaJsonProp) => ReactElement;
export default SchemaJson;
