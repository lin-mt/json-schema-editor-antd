function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { message } from 'antd';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { createContext, useEffect, useState } from 'react';
import Editor from "./components/editor";
import "./index.less";
import SchemaDescription from "./types/SchemaDescription";

/**
 * @title JsonSchemaEditor
 */

export var SchemaMobxContext = /*#__PURE__*/createContext(new SchemaDescription());
var JsonSchemaObserverEditor = observer(function (props) {
  var _useState = useState(new SchemaDescription()),
    _useState2 = _slicedToArray(_useState, 1),
    contextVal = _useState2[0];
  useEffect(function () {
    var defaultSchema;
    if (props.data) {
      if (typeof props.data === 'string') {
        try {
          defaultSchema = JSON.parse(props.data);
        } catch (e) {
          message.error('传入的字符串非 json 格式!');
        }
      } else if (Object.prototype.toString.call(props.data) === '[object Object]') {
        // fix data是空对象首行没有加号的bug
        if (!Object.keys(props.data).length) {
          defaultSchema = {
            type: 'object'
          };
        } else {
          defaultSchema = props.data;
        }
      } else {
        message.error('json数据只支持字符串和对象');
      }
    } else {
      defaultSchema = {
        type: 'object'
      };
    }
    contextVal.changeSchema(defaultSchema);
  }, [JSON.stringify(props.data)]);
  reaction(function () {
    return contextVal.schema;
  }, function (schema) {
    if (props.onChange) {
      props.onChange(JSON.parse(JSON.stringify(schema)));
    }
  });

  // reaction(
  //   () => contextVal.open,
  //   (open) => {
  //     // eslint-disable-next-line no-console
  //     console.log(JSON.parse(JSON.stringify(open)));
  //   }
  // );

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SchemaMobxContext.Provider, {
    value: contextVal
  }, /*#__PURE__*/React.createElement(Editor, {
    jsonEditor: props.jsonEditor,
    mock: props.mock
  })));
});
var JsonSchemaEditor = function JsonSchemaEditor(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(JsonSchemaObserverEditor, props));
};
export default JsonSchemaEditor;