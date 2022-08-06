import { makeAutoObservable } from 'mobx';
import _ from 'lodash';
import {
  addRequiredFields,
  getDefaultSchema,
  getParentKey,
  handleSchema,
  handleSchemaRequired,
} from '../utils/SchemaUtils';
import Open from './Open';
import Schema from './Schema';
import { JSONPATH_JOIN_CHAR } from '../constants';

export default class SchemaDescription {
  schema: Schema;

  open: Open;

  fieldNum: number;

  constructor(schema?: Schema) {
    if (schema) {
      if (schema.type === 'object' && !schema.properties) {
        schema.properties = {};
      }
      this.schema = schema;
    } else {
      this.schema = { type: 'object', properties: {}, required: [] };
    }
    this.open = { properties: true };
    this.fieldNum = 0;
    makeAutoObservable(this);
  }

  changeSchema(value: Schema): void {
    this.schema = handleSchema(value);
  }

  addChildField({ keys }: { keys: string[] }): void {
    const fieldName = `field_${this.fieldNum++}`;
    let clonedSchema = _.clone(this.schema);
    const currentField = _.get(clonedSchema, keys);
    if (currentField !== undefined) {
      clonedSchema = _.update(clonedSchema, keys, (n) =>
        _.assign(n, {
          [fieldName]: getDefaultSchema('string'),
        })
      );
    }
    this.schema = addRequiredFields(clonedSchema, keys, fieldName);
  }

  deleteField({ keys }: { keys: string[] }): void {
    const clonedSchema = _.clone(this.schema);
    _.unset(clonedSchema, keys);
    this.schema = clonedSchema;
  }

  addField({ keys, name }: { keys: string[]; name: string }): void {
    const clonedSchema = _.clone(this.schema);
    const propertiesData = _.get(this.schema, keys);
    let fieldName = `field_${this.fieldNum++}`;
    while (typeof propertiesData[fieldName] !== 'undefined') {
      fieldName = `field_${this.fieldNum++}`;
    }
    let newPropertiesData: Record<string, Schema> = {};
    if (name) {
      for (const i in propertiesData) {
        newPropertiesData[i] = propertiesData[i];
        if (i === name) {
          newPropertiesData[fieldName] = getDefaultSchema('string');
        }
      }
    } else {
      newPropertiesData = _.assign(propertiesData, {
        [fieldName]: getDefaultSchema('string'),
      });
    }
    const newSchema = _.update(clonedSchema, keys, (n) => _.assign(n, newPropertiesData));
    this.schema = addRequiredFields(newSchema, keys, fieldName);
  }

  changeType({ keys, value }: { keys: string[]; value: string }): void {
    const parentKeys: string[] = getParentKey(keys);
    const parentData = parentKeys.length ? _.get(this.schema, parentKeys) : this.schema;
    if (parentData.type === value) {
      return;
    }
    const clonedSchema = _.clone(this.schema);
    const description = parentData.description ? { description: parentData.description } : {};
    const newParentDataItem: Schema = { ...getDefaultSchema(value), ...description };
    if (parentKeys.length === 0) {
      this.schema = { ...newParentDataItem };
    } else {
      this.schema = _.set(clonedSchema, parentKeys, newParentDataItem);
    }
  }

  enableRequire({
    keys,
    name,
    required,
  }: {
    keys: string[];
    name: string;
    required: boolean;
  }): void {
    const parentKeys: string[] = getParentKey(keys);
    const parentData = parentKeys.length ? _.get(this.schema, parentKeys) : this.schema;
    const requiredArray: string[] = [].concat(parentData.required || []);
    const requiredFieldIndex = requiredArray.indexOf(name);
    const foundRequired = requiredFieldIndex >= 0;
    if (!required && foundRequired) {
      // Remove from required arr
      requiredArray.splice(requiredFieldIndex, 1);
    } else if (required && !foundRequired) {
      // Add to required arr
      requiredArray.push(name);
    }
    parentKeys.push('required');
    const clonedSchema = _.clone(this.schema);
    this.schema = _.set(clonedSchema, parentKeys, requiredArray);
  }

  changeName({ keys, name, value }: { keys: string[]; name: string; value: string }): void {
    let clonedSchema = _.clone(this.schema);
    const parentKeys = getParentKey(keys);
    const parentData = parentKeys.length === 0 ? clonedSchema : _.get(clonedSchema, parentKeys);
    let requiredData = [].concat(parentData.required || []);
    const propertiesData = _.get(clonedSchema, keys);
    const newPropertiesData = {};

    const curData = propertiesData[name];
    const openKeys = [].concat(keys, value, 'properties').join(JSONPATH_JOIN_CHAR);
    const oldOpenKeys = [].concat(keys, name, 'properties').join(JSONPATH_JOIN_CHAR);
    if (curData.properties) {
      delete this.open[oldOpenKeys];
      this.open[openKeys] = true;
    }
    if (propertiesData[value] && typeof propertiesData[value] === 'object') {
      return;
    }
    requiredData = requiredData.map((item) => {
      if (item === name) return value;
      return item;
    });

    parentKeys.push('required');

    clonedSchema = _.set(clonedSchema, parentKeys, requiredData);
    for (const i in propertiesData) {
      if (i === name) {
        newPropertiesData[value] = propertiesData[i];
      } else newPropertiesData[i] = propertiesData[i];
    }
    this.schema = _.set(clonedSchema, keys, newPropertiesData);
  }

  changeValue({
    keys,
    value,
  }: {
    keys: string[];
    value: string | boolean | { mock: string };
  }): void {
    const newSchema = _.clone(this.schema);
    if (value) {
      _.set(newSchema, keys, value);
      this.schema = newSchema;
    } else {
      this.deleteField({ keys });
    }
  }

  requireAll({ required }: { required: boolean }): void {
    const newSchema = _.clone(this.schema);
    this.schema = handleSchemaRequired(newSchema, required);
  }

  setOpenValue({ key, value }: { key: string[]; value?: boolean }): void {
    const clonedState = _.clone(this.open);
    const keys = key.join(JSONPATH_JOIN_CHAR);
    const status = value === undefined ? !_.get(this.open, [keys]) : !!value;
    this.open = _.set(clonedState, [keys], status);
  }
}
