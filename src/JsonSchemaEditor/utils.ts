import { JSONSchema7Definition, JSONSchema7TypeName } from './types';

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
