export declare enum ValueType {
    Null = "null",
    Boolean = "boolean",
    Integer = "integer",
    Number = "number",
    String = "string",
    Object = "object",
    Array = "array"
}
export declare type Schema = {
    type?: ValueType | ValueType[];
    items?: Schema;
    properties?: Record<string, Schema>;
    required?: string[];
    anyOf?: Array<Schema>;
};
export declare type SchemaGenOptions = {
    noRequired: boolean;
};
export declare type SchemaComparisonOptions = {
    ignoreRequired: boolean;
};
