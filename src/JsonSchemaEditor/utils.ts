import $RefParser from '@apidevtools/json-schema-ref-parser';
import { JsonSchema } from 'json-schema-library';
import _ from 'lodash';
import { JSONSchema7Definition, JSONSchema7TypeName } from './types';

// 解析 JSON Schema 中的 $ref
function resolveRef(schema: JsonSchema, rootSchema: JsonSchema): JsonSchema {
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (refPath.startsWith('#/')) {
      // 去掉前导的 "#/"
      const refParts = refPath.slice(2).split('/');
      let currentSchema: JsonSchema = _.cloneDeep(rootSchema);
      // 遍历路径并逐层查找
      for (const part of refParts) {
        // 查找当前层级对应的对象
        if (currentSchema[part]) {
          currentSchema = currentSchema[part];
        } else {
          throw new Error(`Unable to resolve $ref: ${refPath}`);
        }
      }
      return currentSchema;
    } else {
      throw new Error(`Unsupported $ref format: ${refPath}`);
    }
  }
  // if (schema.$defs) {
  //   for (const key in schema.$defs) {
  //     if (schema.$defs[key]) {
  //       schema.$defs[key] = resolveRef(schema.$defs[key], rootSchema);
  //     }
  //   }
  // }
  if (schema.properties) {
    for (const key in schema.properties) {
      if (schema.properties[key]) {
        schema.properties[key] = resolveRef(schema.properties[key], rootSchema);
      }
    }
  }
  if (schema.items) {
    if (Array.isArray(schema.items)) {
      schema.items = schema.items.map((item) => resolveRef(item, rootSchema));
    } else {
      schema.items = resolveRef(schema.items, rootSchema);
    }
  }
  if (schema.oneOf) {
    schema.oneOf = schema.oneOf.map((option: JsonSchema) =>
      resolveRef(option, rootSchema),
    );
  }
  if (schema.anyOf) {
    schema.anyOf = schema.anyOf.map((option: JsonSchema) =>
      resolveRef(option, rootSchema),
    );
  }
  if (schema.allOf) {
    schema.allOf = schema.allOf.map((option: JsonSchema) =>
      resolveRef(option, rootSchema),
    );
  }
  return schema;
}

export function getJsonSchemaKey(schema: JsonSchema): string | undefined {
  let jsonSchemaKey;
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (refPath.startsWith('#/')) {
      // 去掉前导的 "#/"
      const refParts = refPath.slice(2).split('/');
      return refParts[0];
    }
    if (schema.properties) {
      for (const key in schema.properties) {
        if (schema.properties[key]) {
          jsonSchemaKey = getJsonSchemaKey(schema.properties[key]);
          if (jsonSchemaKey) {
            return jsonSchemaKey;
          }
        }
      }
    }
  }
  if (schema.items) {
    if (Array.isArray(schema.items)) {
      for (let i = 0; i < schema.items.length; i++) {
        const item = schema.items[i];
        jsonSchemaKey = getJsonSchemaKey(item);
        if (jsonSchemaKey) {
          return jsonSchemaKey;
        }
      }
    } else {
      jsonSchemaKey = getJsonSchemaKey(schema.items);
      if (jsonSchemaKey) {
        return jsonSchemaKey;
      }
    }
  }
  if (schema.oneOf) {
    for (let i = 0; i < schema.oneOf.length; i++) {
      const item = schema.oneOf[i];
      jsonSchemaKey = getJsonSchemaKey(item);
      if (jsonSchemaKey) {
        return jsonSchemaKey;
      }
    }
  }
  if (schema.anyOf) {
    for (let i = 0; i < schema.anyOf.length; i++) {
      const item = schema.anyOf[i];
      jsonSchemaKey = getJsonSchemaKey(item);
      if (jsonSchemaKey) {
        return jsonSchemaKey;
      }
    }
  }
  if (schema.allOf) {
    for (let i = 0; i < schema.allOf.length; i++) {
      const item = schema.allOf[i];
      jsonSchemaKey = getJsonSchemaKey(item);
      if (jsonSchemaKey) {
        return jsonSchemaKey;
      }
    }
  }
  return undefined;
}

export async function resolveJsonSchemaRef(
  schema: JsonSchema,
): Promise<JsonSchema> {
  const resolvedSchema = await $RefParser.dereference(schema, {
    mutateInputSchema: false,
    dereference: {
      circular: 'ignore',
    },
  });
  const jsonSchemaKey = getJsonSchemaKey(resolvedSchema);
  if (jsonSchemaKey) {
    return resolveRef(resolvedSchema, resolvedSchema);
  }
  return resolvedSchema;
}

export function parseJsonStr(str: any) {
  if (typeof str !== 'string') {
    return undefined;
  }

  const jsonStr = str.trim();
  if (jsonStr.startsWith('{') && jsonStr.endsWith('}')) {
    try {
      return JSON.parse(jsonStr);
    } catch (e) {
      return undefined;
    }
  }
  return undefined;
}

export const SchemaTypes = [
  'string',
  'number',
  'array',
  'object',
  'boolean',
  'integer',
];

export function getPropertyIndex(obj: any, propName: string): number {
  if (obj === null || typeof obj !== 'object') {
    console.error('The provided value is not an object.');
    return -1;
  }
  const keys = Object.keys(obj);
  return keys.indexOf(propName);
}

export const StringFormat = [
  { value: 'date-time' },
  { value: 'date' },
  { value: 'time' },
  { value: 'email' },
  { value: 'hostname' },
  { value: 'ipv4' },
  { value: 'ipv6' },
  { value: 'uri' },
  { value: 'regex' },
];

export const SchemaTypeOptions = SchemaTypes.map((value) => {
  return { value: value };
});

export function getDefaultSchema(
  type: JSONSchema7TypeName | JSONSchema7TypeName[],
): JSONSchema7Definition {
  switch (type) {
    case 'string':
      return { type: 'string' };
    case 'number':
      return { type: 'number' };
    case 'boolean':
      return { type: 'boolean' };
    case 'object':
      return { type: 'object', properties: {} };
    case 'integer':
      return { type: 'integer' };
    case 'array':
      return { type: 'array', items: { type: 'string' } };
    case 'null':
  }
  return { type: 'string' };
}

export const inferSchema = (data: any): any => {
  const getType = (value: any): string => {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    return typeof value;
  };

  const generateSchema = (data: any): any => {
    const type = getType(data);

    switch (type) {
      case 'object': {
        const properties: any = {};
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            properties[key] = generateSchema(data[key]);
          }
        }
        return {
          type: 'object',
          properties,
          required: Object.keys(data),
        };
      }
      case 'array':
        return {
          type: 'array',
          items: data.length ? generateSchema(data[0]) : {},
        };
      default:
        return { type };
    }
  };

  return generateSchema(data);
};
