import { Schema, SchemaGenOptions } from './types';
export declare function unwrapSchema(schema: Schema): Schema[];
export declare function unwrapSchemas(schemas: Schema[]): Schema[];
export declare function wrapAnyOfSchema(schema: Schema): Schema;
export declare function createSchema(value: unknown, options?: SchemaGenOptions): Schema;
export declare function mergeSchemas(schemas: Schema[], options?: SchemaGenOptions): Schema;
export declare function extendSchema(schema: Schema, value: unknown, options?: SchemaGenOptions): Schema;
export declare function createCompoundSchema(values: unknown[], options?: SchemaGenOptions): Schema;
