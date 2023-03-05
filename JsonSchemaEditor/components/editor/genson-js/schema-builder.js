function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-use-before-define */
// copy from https://github.com/aspecto-io/genson-js
import { ValueType } from "./types";

// eslint-disable-next-line
function createSchemaFor(value, options) {
  switch (_typeof(value)) {
    case 'number':
      if (Number.isInteger(value)) {
        return {
          type: ValueType.Integer
        };
      }
      return {
        type: ValueType.Number
      };
    case 'boolean':
      return {
        type: ValueType.Boolean
      };
    case 'string':
      return {
        type: ValueType.String
      };
    case 'object':
      if (value === null) {
        return {
          type: ValueType.Null
        };
      }
      if (Array.isArray(value)) {
        return createSchemaForArray(value, options);
      }
      return createSchemaForObject(value, options);
    default:
      throw new Error('unknown type');
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createSchemaForArray(arr, options) {
  if (arr.length === 0) {
    return {
      type: ValueType.Array
    };
  }
  var elementSchemas = arr.map(function (value) {
    return createSchemaFor(value, options);
  });
  var items = combineSchemas(elementSchemas);
  return {
    type: ValueType.Array,
    items: items
  };
}
function createSchemaForObject(obj, options) {
  var keys = Object.keys(obj);
  if (keys.length === 0) {
    return {
      type: ValueType.Object
    };
  }
  var properties = Object.entries(obj).reduce(function (props, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      val = _ref2[1];
    props[key] = createSchemaFor(val, options);
    return props;
  }, {});
  var schema = {
    type: ValueType.Object,
    properties: properties
  };
  if (!(options !== null && options !== void 0 && options.noRequired)) {
    schema.required = keys;
  }
  return schema;
}
function combineSchemas(schemas, options) {
  var _schemasByType, _resultSchemasByType;
  var schemasByType = (_schemasByType = {}, _defineProperty(_schemasByType, ValueType.Null, []), _defineProperty(_schemasByType, ValueType.Boolean, []), _defineProperty(_schemasByType, ValueType.Integer, []), _defineProperty(_schemasByType, ValueType.Number, []), _defineProperty(_schemasByType, ValueType.String, []), _defineProperty(_schemasByType, ValueType.Array, []), _defineProperty(_schemasByType, ValueType.Object, []), _schemasByType);
  var unwrappedSchemas = unwrapSchemas(schemas);
  for (var _i2 = 0, _unwrappedSchemas = unwrappedSchemas; _i2 < _unwrappedSchemas.length; _i2++) {
    var unwrappedSchema = _unwrappedSchemas[_i2];
    var type = unwrappedSchema.type;
    if (schemasByType[type].length === 0 || isContainerSchema(unwrappedSchema)) {
      schemasByType[type].push(unwrappedSchema);
    } else {}
  }
  var resultSchemasByType = (_resultSchemasByType = {}, _defineProperty(_resultSchemasByType, ValueType.Null, schemasByType[ValueType.Null][0]), _defineProperty(_resultSchemasByType, ValueType.Boolean, schemasByType[ValueType.Boolean][0]), _defineProperty(_resultSchemasByType, ValueType.Number, schemasByType[ValueType.Number][0]), _defineProperty(_resultSchemasByType, ValueType.Integer, schemasByType[ValueType.Integer][0]), _defineProperty(_resultSchemasByType, ValueType.String, schemasByType[ValueType.String][0]), _defineProperty(_resultSchemasByType, ValueType.Array, combineArraySchemas(schemasByType[ValueType.Array])), _defineProperty(_resultSchemasByType, ValueType.Object, combineObjectSchemas(schemasByType[ValueType.Object], options)), _resultSchemasByType);
  if (resultSchemasByType[ValueType.Number]) {
    // if at least one value is float, others can be floats too
    // @ts-ignore
    delete resultSchemasByType[ValueType.Integer];
  }
  var schemasFound = Object.values(resultSchemasByType).filter(Boolean);
  var multiType = schemasFound.length > 1;
  if (multiType) {
    return wrapAnyOfSchema({
      anyOf: schemasFound
    });
  }
  return schemasFound[0];
}
function combineArraySchemas(schemas) {
  if (!schemas || schemas.length === 0) {
    // @ts-ignore
    return undefined;
  }
  var itemSchemas = [];
  var _iterator = _createForOfIteratorHelper(schemas),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var schema = _step.value;
      if (!schema.items) continue;
      var unwrappedSchemas = unwrapSchema(schema.items);
      itemSchemas.push.apply(itemSchemas, unwrappedSchemas);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (itemSchemas.length === 0) {
    return {
      type: ValueType.Array
    };
  }
  var items = combineSchemas(itemSchemas);
  return {
    type: ValueType.Array,
    items: items
  };
}
function combineObjectSchemas(schemas, options) {
  if (!schemas || schemas.length === 0) {
    // @ts-ignore
    return undefined;
  }
  var allPropSchemas = schemas.map(function (s) {
    return s.properties;
  }).filter(Boolean);
  var schemasByProp = Object.create(null);
  // const schemasByProp: Record<string, Schema[]> = {};
  var _iterator2 = _createForOfIteratorHelper(allPropSchemas),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var propSchemas = _step2.value;
      // @ts-ignore
      for (var _i3 = 0, _Object$entries = Object.entries(propSchemas); _i3 < _Object$entries.length; _i3++) {
        var _schemasByProp$prop;
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i3], 2),
          prop = _Object$entries$_i[0],
          schema = _Object$entries$_i[1];
        if (!schemasByProp[prop]) {
          schemasByProp[prop] = [];
        }
        var unwrappedSchemas = unwrapSchema(schema);
        (_schemasByProp$prop = schemasByProp[prop]).push.apply(_schemasByProp$prop, unwrappedSchemas);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  var properties = Object.entries(schemasByProp).reduce(function (props, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      prop = _ref4[0],
      schemas = _ref4[1];
    if (schemas.length === 1) {
      // @ts-ignore
      props[prop] = schemas[0];
    } else {
      // @ts-ignore
      props[prop] = combineSchemas(schemas);
    }
    return props;
  }, {});
  var combinedSchema = {
    type: ValueType.Object
  };
  if (Object.keys(properties).length > 0) {
    combinedSchema.properties = properties;
  }
  if (!(options !== null && options !== void 0 && options.noRequired)) {
    var required = intersection(schemas.map(function (s) {
      return s.required || [];
    }));
    if (required.length > 0) {
      combinedSchema.required = required;
    }
  }
  return combinedSchema;
}
export function unwrapSchema(schema) {
  if (!schema) return [];
  if (schema.anyOf) {
    return unwrapSchemas(schema.anyOf);
  }
  if (Array.isArray(schema.type)) {
    return schema.type.map(function (x) {
      return {
        type: x
      };
    });
  }
  return [schema];
}
export function unwrapSchemas(schemas) {
  if (!schemas || schemas.length === 0) return [];
  return schemas.flatMap(function (schema) {
    return unwrapSchema(schema);
  });
}
export function wrapAnyOfSchema(schema) {
  var simpleSchemas = [];
  var complexSchemas = [];
  // @ts-ignore
  var _iterator3 = _createForOfIteratorHelper(schema.anyOf),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var subSchema = _step3.value;
      if (Array.isArray(subSchema.type)) {
        simpleSchemas.push.apply(simpleSchemas, _toConsumableArray(subSchema.type));
      } else if (isSimpleSchema(subSchema)) {
        simpleSchemas.push(subSchema.type);
      } else {
        complexSchemas.push(subSchema);
      }
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  if (complexSchemas.length === 0) {
    // @ts-ignore
    return {
      type: simpleSchemas
    };
  }
  var anyOf = [];
  if (simpleSchemas.length > 0) {
    anyOf.push({
      type: simpleSchemas.length > 1 ? simpleSchemas : simpleSchemas[0]
    });
  }
  anyOf.push.apply(anyOf, complexSchemas);
  // @ts-ignore
  return {
    anyOf: anyOf
  };
}
function intersection(valuesArr) {
  if (valuesArr.length === 0) return [];
  var arrays = valuesArr.filter(Array.isArray);
  var counter = {};
  var _iterator4 = _createForOfIteratorHelper(arrays),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var arr = _step4.value;
      var _iterator5 = _createForOfIteratorHelper(arr),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var val = _step5.value;
          if (!counter[val]) {
            counter[val] = 1;
          } else {
            counter[val]++;
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  return Object.entries(counter).filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      _ = _ref6[0],
      value = _ref6[1];
    return value === arrays.length;
  }).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 1),
      key = _ref8[0];
    return key;
  });
}
function isSimpleSchema(schema) {
  var keys = Object.keys(schema);
  return keys.length === 1 && keys[0] === 'type';
}
function isContainerSchema(schema) {
  var type = schema.type;
  return type === ValueType.Array || type === ValueType.Object;
}

// FACADE

export function createSchema(value, options) {
  // @ts-ignore
  // eslint-disable-next-line no-param-reassign
  if (typeof value === 'undefined') value = null;
  var clone = JSON.parse(JSON.stringify(value));
  return createSchemaFor(clone, options);
}
export function mergeSchemas(schemas, options) {
  return combineSchemas(schemas, options);
}
export function extendSchema(schema, value, options) {
  var valueSchema = createSchema(value, options);
  return combineSchemas([schema, valueSchema], options);
}
export function createCompoundSchema(values, options) {
  var schemas = values.map(function (value) {
    return createSchema(value, options);
  });
  return mergeSchemas(schemas, options);
}