import { ReactElement } from 'react';
import Schema from '../../../types/Schema';
interface SchemaArrayProp {
    data: Schema;
    prefix: string[];
    showEdit: (editorName: string[], prefix: string, propertyElement: string | {
        mock: string;
    }, type?: string) => void;
    showAdv: (prefix: string[], property?: Schema) => void;
}
declare const SchemaArray: (props: SchemaArrayProp) => ReactElement;
export default SchemaArray;
