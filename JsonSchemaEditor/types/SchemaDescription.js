function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import _ from 'lodash';
import { makeAutoObservable } from 'mobx';
import { JSONPATH_JOIN_CHAR } from "../constants";
import { addRequiredFields, getDefaultSchema, getParentKey, handleSchema, handleSchemaRequired } from "../utils/SchemaUtils";
var SchemaDescription = /*#__PURE__*/function () {
  function SchemaDescription(schema) {
    _classCallCheck(this, SchemaDescription);
    _defineProperty(this, "schema", void 0);
    _defineProperty(this, "open", void 0);
    _defineProperty(this, "fieldNum", void 0);
    if (schema) {
      if (schema.type === 'object' && !schema.properties) {
        schema.properties = {};
      }
      this.schema = schema;
    } else {
      this.schema = {
        type: 'object',
        properties: {},
        required: []
      };
    }
    this.open = {
      properties: true
    };
    this.fieldNum = 0;
    makeAutoObservable(this);
  }
  _createClass(SchemaDescription, [{
    key: "changeSchema",
    value: function changeSchema(value) {
      this.schema = handleSchema(value);
    }
  }, {
    key: "addChildField",
    value: function addChildField(_ref) {
      var keys = _ref.keys;
      var clonedSchema = _.clone(this.schema);
      var currentField = _.get(clonedSchema, keys);
      var fieldName = "field_".concat(this.fieldNum++);
      while (typeof currentField[fieldName] !== 'undefined') {
        fieldName = "field_".concat(this.fieldNum++);
      }
      if (currentField !== undefined) {
        clonedSchema = _.update(clonedSchema, keys, function (n) {
          return _.assign(n, _defineProperty({}, fieldName, getDefaultSchema('string')));
        });
      }
      this.schema = addRequiredFields(clonedSchema, keys, fieldName);
    }
  }, {
    key: "deleteField",
    value: function deleteField(_ref2) {
      var keys = _ref2.keys;
      var clonedSchema = _.clone(this.schema);
      _.unset(clonedSchema, keys);
      this.schema = clonedSchema;
    }
  }, {
    key: "addField",
    value: function addField(_ref3) {
      var keys = _ref3.keys,
        name = _ref3.name;
      var clonedSchema = _.clone(this.schema);
      var propertiesData = _.get(this.schema, keys);
      var fieldName = "field_".concat(this.fieldNum++);
      while (typeof propertiesData[fieldName] !== 'undefined') {
        fieldName = "field_".concat(this.fieldNum++);
      }
      var newPropertiesData = {};
      if (name) {
        // eslint-disable-next-line guard-for-in
        for (var i in propertiesData) {
          newPropertiesData[i] = propertiesData[i];
          if (i === name) {
            newPropertiesData[fieldName] = getDefaultSchema('string');
          }
        }
      } else {
        newPropertiesData = _.assign(propertiesData, _defineProperty({}, fieldName, getDefaultSchema('string')));
      }
      var newSchema = _.update(clonedSchema, keys, function (n) {
        return _.assign(n, newPropertiesData);
      });
      this.schema = addRequiredFields(newSchema, keys, fieldName);
    }
  }, {
    key: "changeType",
    value: function changeType(_ref4) {
      var keys = _ref4.keys,
        value = _ref4.value;
      var parentKeys = getParentKey(keys);
      var parentData = parentKeys.length ? _.get(this.schema, parentKeys) : this.schema;
      if (parentData.type === value) {
        return;
      }
      var clonedSchema = _.clone(this.schema);
      var description = parentData.description ? {
        description: parentData.description
      } : {};
      var newParentDataItem = _objectSpread(_objectSpread({}, getDefaultSchema(value)), description);
      if (parentKeys.length === 0) {
        this.schema = _objectSpread({}, newParentDataItem);
      } else {
        this.schema = _.set(clonedSchema, parentKeys, newParentDataItem);
      }
    }
  }, {
    key: "enableRequire",
    value: function enableRequire(_ref5) {
      var keys = _ref5.keys,
        name = _ref5.name,
        required = _ref5.required;
      var parentKeys = getParentKey(keys);
      var parentData = parentKeys.length ? _.get(this.schema, parentKeys) : this.schema;
      var requiredArray = [].concat(parentData.required || []);
      var requiredFieldIndex = requiredArray.indexOf(name);
      var foundRequired = requiredFieldIndex >= 0;
      if (!required && foundRequired) {
        // Remove from required arr
        requiredArray.splice(requiredFieldIndex, 1);
      } else if (required && !foundRequired) {
        // Add to required arr
        requiredArray.push(name);
      }
      parentKeys.push('required');
      var clonedSchema = _.clone(this.schema);
      this.schema = _.set(clonedSchema, parentKeys, requiredArray);
    }
  }, {
    key: "changeName",
    value: function changeName(_ref6) {
      var keys = _ref6.keys,
        name = _ref6.name,
        value = _ref6.value;
      var clonedSchema = _.clone(this.schema);
      var parentKeys = getParentKey(keys);
      var parentData = parentKeys.length === 0 ? clonedSchema : _.get(clonedSchema, parentKeys);
      var requiredData = [].concat(parentData.required || []);
      var propertiesData = _.get(clonedSchema, keys);
      var newPropertiesData = {};
      var curData = propertiesData[name];
      var openKeys = _toConsumableArray(keys).concat(value, 'properties').join(JSONPATH_JOIN_CHAR);
      var oldOpenKeys = _toConsumableArray(keys).concat(name, 'properties').join(JSONPATH_JOIN_CHAR);
      if (curData.properties) {
        // @ts-ignore
        delete this.open[oldOpenKeys];
        // @ts-ignore
        this.open[openKeys] = true;
      }
      if (propertiesData[value] && _typeof(propertiesData[value]) === 'object') {
        return;
      }
      // @ts-ignore
      requiredData = requiredData.map(function (item) {
        if (item === name) return value;
        return item;
      });
      parentKeys.push('required');
      clonedSchema = _.set(clonedSchema, parentKeys, requiredData);
      for (var i in propertiesData) {
        if (i === name) {
          // @ts-ignore
          newPropertiesData[value] = propertiesData[i];
        } else {
          // @ts-ignore
          newPropertiesData[i] = propertiesData[i];
        }
      }
      this.schema = _.set(clonedSchema, keys, newPropertiesData);
    }
  }, {
    key: "changeValue",
    value: function changeValue(_ref7) {
      var keys = _ref7.keys,
        value = _ref7.value;
      var newSchema = _.clone(this.schema);
      if (value) {
        _.set(newSchema, keys, value);
        this.schema = newSchema;
      } else {
        this.deleteField({
          keys: keys
        });
      }
    }
  }, {
    key: "requireAll",
    value: function requireAll(_ref8) {
      var required = _ref8.required;
      var newSchema = _.clone(this.schema);
      this.schema = handleSchemaRequired(newSchema, required);
    }
  }, {
    key: "setOpenValue",
    value: function setOpenValue(_ref9) {
      var key = _ref9.key,
        value = _ref9.value;
      var clonedState = _.clone(this.open);
      var keys = key.join(JSONPATH_JOIN_CHAR);
      var status = value === undefined ? !_.get(this.open, [keys]) : value;
      this.open = _.set(clonedState, [keys], status);
    }
  }]);
  return SchemaDescription;
}();
export { SchemaDescription as default };