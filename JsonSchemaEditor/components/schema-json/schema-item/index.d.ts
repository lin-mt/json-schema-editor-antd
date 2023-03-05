import { ReactElement } from 'react';
import Schema from '../../../types/Schema';
interface SchemaItemProp {
    data: Schema;
    name: string;
    prefix: string[];
    showEdit: (editorName: string[], prefix: string, propertyElement: string | {
        mock: string;
    }, type?: string) => void;
    showAdv: (prefix: string[], property?: Schema) => void;
}
declare const SchemaItem: (props: SchemaItemProp) => ReactElement | null;
export default SchemaItem;
