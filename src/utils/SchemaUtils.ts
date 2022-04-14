import _ from 'lodash';
import Schema from '../types/Schema';
import SchemaDescription from '../types/SchemaDescription';

export function getDefaultSchema(type: string): Schema {
  switch (type) {
    case 'string':
      return {
        type: 'string',
      };
    case 'number':
      return {
        type: 'number',
      };
    case 'array':
      return {
        type: 'array',
        items: {
          type: 'string',
        },
      };
    case 'object':
      return {
        type: 'object',
        properties: {},
      };
    case 'boolean':
      return {
        type: 'boolean',
      };
    case 'integer':
      return {
        type: 'integer',
      };
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
}

export const handleSchema = (schema: Schema): Schema => {
  const clonedSchema = _.cloneDeep(schema);
  if (clonedSchema && !clonedSchema.type && !clonedSchema.properties) {
    clonedSchema.type = 'string';
  }
  if (
    !clonedSchema.type &&
    clonedSchema.properties &&
    typeof clonedSchema.properties === 'object'
  ) {
    clonedSchema.type = 'object';
  }
  if (clonedSchema.type === 'object') {
    if (!clonedSchema.properties) {
      clonedSchema.properties = {};
    }
    Object.keys(clonedSchema.properties).forEach((key) => {
      if (
        !clonedSchema.properties[key].type &&
        clonedSchema.properties[key].properties &&
        typeof clonedSchema.properties[key].properties === 'object'
      ) {
        clonedSchema.properties[key].type = 'object';
      }
      if (
        clonedSchema.properties[key].type === 'array' ||
        clonedSchema.properties[key].type === 'object'
      ) {
        clonedSchema.properties[key] = handleSchema(clonedSchema.properties[key]);
      }
    });
  } else if (clonedSchema.type === 'array') {
    if (!clonedSchema.items) {
      clonedSchema.items = { type: 'string' };
    }
    clonedSchema.items = handleSchema(clonedSchema.items);
  }
  return clonedSchema;
};

export const getParentKey = (keys: string[]): string[] => {
  if (!keys) {
    return [];
  }
  return keys.length === 1 ? [] : _.dropRight(keys, 1);
};

export const addRequiredFields = (schema: Schema, keys: string[], fieldName: string): Schema => {
  const parentKeys: string[] = getParentKey(keys); // parent
  const parentData = parentKeys.length ? _.get(schema, parentKeys) : schema;
  const requiredData: string[] = [].concat(parentData.required || []);
  requiredData.push(fieldName);
  parentKeys.push('required');
  return _.set(schema, parentKeys, _.uniq(requiredData));
};

export const removeRequireField = (schema: Schema, keys: string[], fieldName: string): Schema => {
  const parentKeys: string[] = getParentKey(keys); // parent
  const parentData = parentKeys.length ? _.get(schema, parentKeys) : schema;
  const requiredData = [].concat(parentData.required || []);
  const filteredRequire = requiredData.filter((i) => i !== fieldName);
  parentKeys.push('required');
  return _.set(schema, parentKeys, _.uniq(filteredRequire));
};

export const handleSchemaRequired = (schema: Schema, checked: boolean): Schema => {
  const newSchema = _.cloneDeep(schema);
  if (newSchema.type === 'object') {
    const requiredTitle = getFieldsTitle(newSchema.properties);
    if (checked) {
      newSchema.required = requiredTitle;
    } else {
      delete newSchema.required;
    }
    if (newSchema.properties) {
      newSchema.properties = handleObject(newSchema.properties, checked);
    }
  } else if (newSchema.type === 'array') {
    if (newSchema.items) {
      newSchema.items = handleSchemaRequired(newSchema.items, checked);
    }
  }
  return newSchema;
};

function handleObject(properties: Record<string, SchemaDescription>, checked: boolean) {
  const clonedProperties = _.cloneDeep(properties);
  for (const key in clonedProperties) {
    if (clonedProperties[key].type === 'array' || clonedProperties[key].type === 'object')
      clonedProperties[key] = handleSchemaRequired(clonedProperties[key], checked);
  }
  return clonedProperties;
}

function getFieldsTitle(data: Record<string, SchemaDescription>): string[] {
  const requiredTitle: string[] = [];
  Object.keys(data).forEach((title) => {
    requiredTitle.push(title);
  });
  return requiredTitle;
}
