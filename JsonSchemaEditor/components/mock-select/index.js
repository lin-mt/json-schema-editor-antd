function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { EditOutlined } from '@ant-design/icons';
import { AutoComplete, Input } from 'antd';
import React, { useState } from 'react';
import { MOCK_SOURCE } from "../../constants";
var MockSelect = function MockSelect(props) {
  var _schema$mock;
  var schema = props.schema;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    open = _useState2[0],
    setOpen = _useState2[1];
  var children = MOCK_SOURCE.map(function (item) {
    return {
      label: item.name,
      value: item.mock
    };
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(AutoComplete, {
    style: {
      width: '100%'
    },
    className: "certain-category-search",
    dropdownMatchSelectWidth: false,
    options: children,
    filterOption: true,
    value: schema !== null && schema !== void 0 && schema.mock ? typeof schema.mock !== 'string' ? (_schema$mock = schema.mock) === null || _schema$mock === void 0 ? void 0 : _schema$mock.mock : schema.mock : '',
    open: open,
    onChange: props.onChange,
    disabled: (schema === null || schema === void 0 ? void 0 : schema.type) === 'object' || (schema === null || schema === void 0 ? void 0 : schema.type) === 'array'
  }, /*#__PURE__*/React.createElement(Input, {
    style: {
      width: '100%'
    },
    placeholder: "mock",
    className: (schema === null || schema === void 0 ? void 0 : schema.type) === 'object' || (schema === null || schema === void 0 ? void 0 : schema.type) === 'array' ? 'input-icon-editor-disabled' : 'input-icon-editor',
    onFocus: function onFocus() {
      return setOpen(true);
    },
    onBlur: function onBlur() {
      return setOpen(false);
    },
    addonAfter: /*#__PURE__*/React.createElement(EditOutlined, {
      className: (schema === null || schema === void 0 ? void 0 : schema.type) === 'object' || (schema === null || schema === void 0 ? void 0 : schema.type) === 'array' ? 'input-icon-editor-disabled' : 'input-icon-editor',
      onClick: function onClick(e) {
        e.stopPropagation();
        props.showEdit();
      }
    })
  })));
};
export default MockSelect;