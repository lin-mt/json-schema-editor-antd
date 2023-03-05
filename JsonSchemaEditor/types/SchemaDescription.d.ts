import Open from './Open';
import Schema from './Schema';
export default class SchemaDescription {
    schema: Schema;
    open: Open;
    fieldNum: number;
    constructor(schema?: Schema);
    changeSchema(value: Schema): void;
    addChildField({ keys }: {
        keys: string[];
    }): void;
    deleteField({ keys }: {
        keys: string[];
    }): void;
    addField({ keys, name }: {
        keys: string[];
        name: string;
    }): void;
    changeType({ keys, value }: {
        keys: string[];
        value: string;
    }): void;
    enableRequire({ keys, name, required, }: {
        keys: string[];
        name: string;
        required: boolean;
    }): void;
    changeName({ keys, name, value, }: {
        keys: string[];
        name: string;
        value: string;
    }): void;
    changeValue({ keys, value, }: {
        keys: string[];
        value: string | boolean | {
            mock: string;
        };
    }): void;
    requireAll({ required }: {
        required: boolean;
    }): void;
    setOpenValue({ key, value }: {
        key: string[];
        value?: boolean;
    }): void;
}
