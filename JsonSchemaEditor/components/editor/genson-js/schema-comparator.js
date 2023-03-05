function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/* eslint-disable @typescript-eslint/no-use-before-define */
// copy from https://github.com/aspecto-io/genson-js
import { unwrapSchema } from "./schema-builder";
export function areSchemasEqual(schema1, schema2, options) {
  if (schema1 === undefined && schema2 === undefined) return true;
  if (schema1 === undefined || schema2 === undefined) return false;
  var anyOf1 = unwrapSchema(schema1);
  var anyOf2 = unwrapSchema(schema2);
  if (anyOf1.length !== anyOf2.length) return false;
  if (anyOf1.length === 0) return true;
  var typeComparator = function typeComparator(s1, s2) {
    return (
      // @ts-ignore
      s1.type.toLocaleString().localeCompare(s2.type.toLocaleString())
    );
  };
  var sorted1 = _toConsumableArray(anyOf1).sort(typeComparator);
  var sorted2 = _toConsumableArray(anyOf2).sort(typeComparator);
  for (var i = 0; i < anyOf1.length; i++) {
    var s1 = sorted1[i];
    var s2 = sorted2[i];
    if (s1.type !== s2.type) return false;
    // @ts-ignore
    if (!(options !== null && options !== void 0 && options.ignoreRequired) && !areArraysEqual(s1.required, s2.required)) return false;
    // @ts-ignore
    if (!arePropsEqual(s1.properties, s2.properties, options)) return false;
    // @ts-ignore
    if (!areSchemasEqual(s1.items, s2.items, options)) return false;
  }
  return true;
}
function areArraysEqual(arr1, arr2) {
  if (arr1 === undefined && arr2 === undefined) return true;
  if (arr1 === undefined || arr2 === undefined) return false;
  var set1 = new Set(arr1);
  var set2 = new Set(arr2);
  var combined = new Set([].concat(_toConsumableArray(arr1), _toConsumableArray(arr2)));
  return combined.size === set1.size && combined.size === set2.size;
}
function arePropsEqual(props1, props2, options) {
  if (props1 === undefined && props2 === undefined) return true;
  if (props1 === undefined || props2 === undefined) return false;
  var keys1 = Object.keys(props1);
  var keys2 = Object.keys(props2);
  if (!areArraysEqual(keys1, keys2)) return false;
  for (var _i = 0, _keys = keys1; _i < _keys.length; _i++) {
    var key = _keys[_i];
    if (!areSchemasEqual(props1[key], props2[key], options)) return false;
  }
  return true;
}