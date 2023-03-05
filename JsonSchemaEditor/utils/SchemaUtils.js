function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
import _ from 'lodash';
export function getDefaultSchema(type) {
  switch (type) {
    case 'string':
      return {
        type: 'string'
      };
    case 'number':
      return {
        type: 'number'
      };
    case 'array':
      return {
        type: 'array',
        items: {
          type: 'string'
        }
      };
    case 'object':
      return {
        type: 'object',
        properties: {}
      };
    case 'boolean':
      return {
        type: 'boolean'
      };
    case 'integer':
      return {
        type: 'integer'
      };
    default:
      throw new Error("Unsupported type: ".concat(type));
  }
}
export var handleSchema = function handleSchema(schema) {
  var clonedSchema = _.cloneDeep(schema);
  if (clonedSchema && !clonedSchema.type && !clonedSchema.properties) {
    clonedSchema.type = 'string';
  }
  if (!clonedSchema.type && clonedSchema.properties && _typeof(clonedSchema.properties) === 'object') {
    clonedSchema.type = 'object';
  }
  if (clonedSchema.type === 'object') {
    if (!clonedSchema.properties) {
      clonedSchema.properties = {};
    }
    Object.keys(clonedSchema.properties).forEach(function (key) {
      if (
      // @ts-ignore
      !clonedSchema.properties[key].type &&
      // @ts-ignore
      clonedSchema.properties[key].properties &&
      // @ts-ignore
      _typeof(clonedSchema.properties[key].properties) === 'object') {
        // @ts-ignore
        clonedSchema.properties[key].type = 'object';
      }
      if (
      // @ts-ignore
      clonedSchema.properties[key].type === 'array' ||
      // @ts-ignore
      clonedSchema.properties[key].type === 'object') {
        // @ts-ignore
        clonedSchema.properties[key] = handleSchema(clonedSchema.properties[key]);
      }
    });
  } else if (clonedSchema.type === 'array') {
    if (!clonedSchema.items) {
      clonedSchema.items = {
        type: 'string'
      };
    }
    clonedSchema.items = handleSchema(clonedSchema.items);
  }
  return clonedSchema;
};
export var getParentKey = function getParentKey(keys) {
  if (!keys) {
    return [];
  }
  return keys.length === 1 ? [] : _.dropRight(keys, 1);
};
export var addRequiredFields = function addRequiredFields(schema, keys, fieldName) {
  var parentKeys = getParentKey(keys); // parent
  var parentData = parentKeys.length ? _.get(schema, parentKeys) : schema;
  var requiredData = [].concat(parentData.required || []);
  requiredData.push(fieldName);
  parentKeys.push('required');
  return _.set(schema, parentKeys, _.uniq(requiredData));
};
export var removeRequireField = function removeRequireField(schema, keys, fieldName) {
  var parentKeys = getParentKey(keys); // parent
  var parentData = parentKeys.length ? _.get(schema, parentKeys) : schema;
  var requiredData = [].concat(parentData.required || []);
  var filteredRequire = requiredData.filter(function (i) {
    return i !== fieldName;
  });
  parentKeys.push('required');
  return _.set(schema, parentKeys, _.uniq(filteredRequire));
};
export var handleSchemaRequired = function handleSchemaRequired(schema, checked) {
  var newSchema = _.cloneDeep(schema);
  if (newSchema.type === 'object') {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    var requiredTitle = getFieldsTitle(newSchema.properties);
    if (checked) {
      newSchema.required = requiredTitle;
    } else {
      delete newSchema.required;
    }
    if (newSchema.properties) {
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      newSchema.properties = handleObject(newSchema.properties, checked);
    }
  } else if (newSchema.type === 'array') {
    if (newSchema.items) {
      newSchema.items = handleSchemaRequired(newSchema.items, checked);
    }
  }
  return newSchema;
};
function handleObject(properties, checked) {
  var clonedProperties = _.cloneDeep(properties);
  for (var key in clonedProperties) {
    if (clonedProperties[key].type === 'array' || clonedProperties[key].type === 'object') clonedProperties[key] = handleSchemaRequired(clonedProperties[key], checked);
  }
  return clonedProperties;
}
function getFieldsTitle(data) {
  var requiredTitle = [];
  Object.keys(data).forEach(function (title) {
    requiredTitle.push(title);
  });
  return requiredTitle;
}