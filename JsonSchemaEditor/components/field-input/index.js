function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { Input, message } from 'antd';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
var FieldInput = function FieldInput(props) {
  var _useState = useState(props.value),
    _useState2 = _slicedToArray(_useState, 2),
    fieldValue = _useState2[0],
    setFieldValue = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    status = _useState4[0],
    setStatus = _useState4[1];
  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    placeholder = _useState6[0],
    setPlaceholder = _useState6[1];
  var ref = useRef(null);
  useEffect(function () {
    setFieldValue(props.value);
  }, [props.value]);
  var handleChange = function handleChange(value) {
    if (value.length === 0) {
      message.warning('FieldName can not empty.').then();
      setStatus('error');
      setFieldValue(function (prevState) {
        setPlaceholder(prevState);
        return value;
      });
      return;
    }
    setPlaceholder('');
    setStatus('');
    if (placeholder === value) {
      setFieldValue(value);
      return;
    }
    if (props.onChange(value) && value) {
      setFieldValue(value);
    }
  };
  useEffect(function () {
    var current = ref.current;
    if (current !== null) {
      var _current$input;
      (_current$input = current.input) === null || _current$input === void 0 ? void 0 : _current$input.addEventListener('blur', _.debounce(function () {
        var _current$input2;
        if (((_current$input2 = current.input) === null || _current$input2 === void 0 ? void 0 : _current$input2.value.length) === 0) {
          message.warning('FieldName can not empty.').then();
          current.input.focus();
        }
      }, 50));
    }
  }, []);
  return /*#__PURE__*/React.createElement(Input, {
    ref: ref,
    status: status,
    addonAfter: props.addonAfter,
    value: fieldValue,
    placeholder: placeholder,
    onChange: function onChange(ele) {
      return handleChange(ele.target.value);
    }
  });
};
export default FieldInput;