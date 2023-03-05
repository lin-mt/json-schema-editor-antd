function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox, Col, Input, InputNumber, Row, Switch, Tooltip } from 'antd';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { EditorContext } from "../../editor";
var TextArea = Input.TextArea;
var changeOtherValue = function changeOtherValue(value, name, data, change) {
  // @ts-ignore
  data[name] = value;
  change(data);
};
var SchemaNumber = function SchemaNumber(props) {
  var data = props.data;
  var _useState = useState(props.data.enum !== undefined),
    _useState2 = _slicedToArray(_useState, 2),
    checked = _useState2[0],
    setChecked = _useState2[1];
  var _useState3 = useState(props.data.enum === undefined ? '' : props.data.enum.join('\n')),
    _useState4 = _slicedToArray(_useState3, 2),
    enumVal = _useState4[0],
    setEnumVal = _useState4[1];
  useEffect(function () {
    setEnumVal(props.data.enum === undefined ? '' : props.data.enum.join('\n'));
  }, [props.data.enum]);
  useEffect(function () {
    setChecked(props.data.enum !== undefined);
  }, [props.data.enum]);
  var context = useContext(EditorContext);
  var onChangeCheckBox = function onChangeCheckBox(checked, data) {
    setChecked(checked);
    if (!checked) {
      delete data.enum;
      delete data.enumDesc;
      setEnumVal('');
      context.changeCustomValue(data);
    }
  };
  var changeEnumOtherValue = function changeEnumOtherValue(value, data) {
    var newEnumVal = value;
    var inputArr = newEnumVal.split('\n');
    if (data && data.type === 'number') {
      if (enumVal.split('\n').length === inputArr.length) {
        if (inputArr[inputArr.length - 1] === '') {
          newEnumVal = newEnumVal.slice(0, newEnumVal.length - 1);
        }
      }
    }
    setEnumVal(newEnumVal);
    var arr = newEnumVal.split('\n');
    var newData = _.cloneDeep(data);
    var newEnum = [];
    arr.forEach(function (item) {
      if (!Number.isNaN(Number(item))) {
        newEnum.push(Number(item));
      } else {
        for (var i = 1; i < item.length + 1; i += 1) {
          if (Number.isNaN(Number(item.slice(0, i))) && i > 1) {
            newEnum.push(Number(item.slice(0, i - 1)));
            break;
          }
        }
      }
    });
    if (newEnum.length > 0 && newEnumVal !== '') {
      newData.enum = newEnum;
    } else {
      delete newData.enum;
      delete newData.enumDesc;
      setEnumVal('');
    }
    context.changeCustomValue(newData);
  };
  var changeEnumDescOtherValue = function changeEnumDescOtherValue(value, data) {
    data.enumDesc = value;
    context.changeCustomValue(data);
  };
  function handleDefaultValueChange(value) {
    changeOtherValue(value, 'default', data, context.changeCustomValue);
  }
  function handleExclusiveMinimumValueChange(value) {
    changeOtherValue(value, 'exclusiveMinimum', data, context.changeCustomValue);
  }
  function handleMinimumValueChange(value) {
    changeOtherValue(value, 'minimum', data, context.changeCustomValue);
  }
  function handleExclusiveMaximumValueChange(value) {
    changeOtherValue(value, 'exclusiveMaximum', data, context.changeCustomValue);
  }
  function handleMaximumValueChange(value) {
    changeOtherValue(value, 'maximum', data, context.changeCustomValue);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "default-setting"
  }, "base_setting"), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 4,
    className: "other-label"
  }, "default\uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 20
  }, /*#__PURE__*/React.createElement(Input, {
    value: data.default ? data.default.toString() : undefined,
    placeholder: "default",
    onChange: function onChange(event) {
      return handleDefaultValueChange(event.target.value);
    }
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 13,
    className: "other-label"
  }, /*#__PURE__*/React.createElement("span", null, "exclusiveMinimum\xA0", /*#__PURE__*/React.createElement(Tooltip, {
    title: "exclusiveMinimum"
  }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, null)), "\xA0\uFF1A")), /*#__PURE__*/React.createElement(Col, {
    span: 11
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: data.exclusiveMinimum,
    onChange: handleExclusiveMinimumValueChange
  })))), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 13,
    className: "other-label"
  }, /*#__PURE__*/React.createElement("span", null, "exclusiveMaximum\xA0", /*#__PURE__*/React.createElement(Tooltip, {
    title: "exclusiveMaximum"
  }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, null)), "\xA0\uFF1A")), /*#__PURE__*/React.createElement(Col, {
    span: 11
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: data.exclusiveMaximum,
    onChange: handleExclusiveMaximumValueChange
  }))))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8,
    className: "other-label"
  }, "minimum\uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 16
  }, /*#__PURE__*/React.createElement(InputNumber, {
    value: data.minimum,
    style: {
      width: '100%'
    },
    placeholder: "minimum",
    onChange: handleMinimumValueChange
  })))), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8,
    className: "other-label"
  }, "maximum\uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 16
  }, /*#__PURE__*/React.createElement(InputNumber, {
    value: data.maximum,
    style: {
      width: '100%'
    },
    placeholder: "maximum",
    onChange: handleMaximumValueChange
  }))))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 4,
    className: "other-label"
  }, /*#__PURE__*/React.createElement("span", null, 'enum ', /*#__PURE__*/React.createElement(Checkbox, {
    checked: checked,
    onChange: function onChange(event) {
      return onChangeCheckBox(event.target.checked, data);
    }
  }), ' ', "\uFF1A")), /*#__PURE__*/React.createElement(Col, {
    span: 20
  }, /*#__PURE__*/React.createElement(TextArea, {
    value: enumVal,
    disabled: !checked,
    placeholder: "enum_msg",
    autoSize: {
      minRows: 2,
      maxRows: 6
    },
    onChange: function onChange(event) {
      return changeEnumOtherValue(event.target.value, data);
    }
  }))), checked && /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 4,
    className: "other-label"
  }, /*#__PURE__*/React.createElement("span", null, "enum_desc\uFF1A")), /*#__PURE__*/React.createElement(Col, {
    span: 20
  }, /*#__PURE__*/React.createElement(TextArea, {
    value: data.enumDesc,
    disabled: !checked,
    placeholder: "enum_desc_msg",
    autoSize: {
      minRows: 2,
      maxRows: 6
    },
    onChange: function onChange(event) {
      return changeEnumDescOtherValue(event.target.value, data);
    }
  }))));
};
export default SchemaNumber;