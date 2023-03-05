import Schema from '../types/Schema';
export declare function getDefaultSchema(type: string): Schema;
export declare const handleSchema: (schema: Schema) => Schema;
export declare const getParentKey: (keys: string[]) => string[];
export declare const addRequiredFields: (schema: Schema, keys: string[], fieldName: string) => Schema;
export declare const removeRequireField: (schema: Schema, keys: string[], fieldName: string) => Schema;
export declare const handleSchemaRequired: (schema: Schema, checked: boolean) => Schema;
