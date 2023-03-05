import { ReactElement } from 'react';
import Schema from '../../../types/Schema';
interface SchemaObjectProp {
    data: Schema;
    prefix: string[];
    showEdit: (prefix: string[], editorName: string, propertyElement: string | {
        mock: string;
    }, type?: string) => void;
    showAdv: (prefix: string[], property?: Schema) => void;
}
declare const SchemaObject: (props: SchemaObjectProp) => ReactElement;
export default SchemaObject;
