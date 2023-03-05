function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Checkbox, Col, Input, InputNumber, Row, Select, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { STRING_FORMATS } from "../../../constants";
import { EditorContext } from "../../editor";
var SchemaString = function SchemaString(props) {
  var data = props.data;
  var _useState = useState(props.data.enum !== undefined),
    _useState2 = _slicedToArray(_useState, 2),
    checked = _useState2[0],
    setChecked = _useState2[1];
  var format = STRING_FORMATS;
  var context = useContext(EditorContext);
  useEffect(function () {
    setChecked(props.data.enum !== undefined);
  }, [props.data.enum]);
  var changeOtherValue = function changeOtherValue(value, name, data) {
    // @ts-ignore
    data[name] = value;
    context.changeCustomValue(data);
  };
  var changeEnumOtherValue = function changeEnumOtherValue(value, data) {
    var arr = value.split('\n');
    if (arr.length === 0 || arr.length === 1 && !arr[0]) {
      delete data.enum;
      delete data.enumDesc;
      context.changeCustomValue(data);
    } else {
      data.enum = arr;
      context.changeCustomValue(data);
    }
  };
  var changeEnumDescOtherValue = function changeEnumDescOtherValue(value, data) {
    data.enumDesc = value;
    context.changeCustomValue(data);
  };
  var onChangeCheckBox = function onChangeCheckBox(checked, data) {
    setChecked(checked);
    if (!checked) {
      delete data.enum;
      delete data.enumDesc;
      context.changeCustomValue(data);
    }
  };
  var getDefaultValue = function getDefaultValue(defaultVal) {
    if (typeof defaultVal === 'boolean') {
      return defaultVal ? 'true' : 'false';
    }
    return defaultVal;
  };
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
    value: getDefaultValue(data.default),
    placeholder: "default",
    onChange: function onChange(event) {
      return changeOtherValue(event.target.value, 'default', data);
    }
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8,
    className: "other-label"
  }, "minLength\uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 16
  }, /*#__PURE__*/React.createElement(InputNumber, {
    style: {
      width: '100%'
    },
    value: data.minLength,
    placeholder: "min.length",
    onChange: function onChange(value) {
      return changeOtherValue(value, 'minLength', data);
    }
  })))), /*#__PURE__*/React.createElement(Col, {
    span: 12
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8,
    className: "other-label"
  }, "maxLength\uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 16
  }, /*#__PURE__*/React.createElement(InputNumber, {
    style: {
      width: '100%'
    },
    value: data.maxLength,
    placeholder: "max.length",
    onChange: function onChange(value) {
      return changeOtherValue(value, 'maxLength', data);
    }
  }))))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 4,
    className: "other-label"
  }, /*#__PURE__*/React.createElement("span", null, "Pattern\xA0", /*#__PURE__*/React.createElement(Tooltip, {
    title: "pattern"
  }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, null)), "\xA0\uFF1A")), /*#__PURE__*/React.createElement(Col, {
    span: 20
  }, /*#__PURE__*/React.createElement(Input, {
    value: data.pattern,
    placeholder: "Pattern",
    onChange: function onChange(event) {
      return changeOtherValue(event.target.value, 'pattern', data);
    }
  }))), /*#__PURE__*/React.createElement(Row, {
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
  }, /*#__PURE__*/React.createElement(Input.TextArea, {
    value: data.enum && data.enum.length && data.enum.join('\n'),
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
  }, "enum_desc\uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 20
  }, /*#__PURE__*/React.createElement(Input.TextArea, {
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
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 4,
    className: "other-label"
  }, "format\uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 20
  }, /*#__PURE__*/React.createElement(Select, {
    showSearch: true,
    allowClear: true,
    value: data.format,
    style: {
      width: 200
    },
    placeholder: "Select a format",
    popupClassName: "json-schema-react-editor-adv-modal-select",
    onChange: function onChange(value) {
      return changeOtherValue(value, 'format', data);
    },
    filterOption: function filterOption(input, option) {
      return (option === null || option === void 0 ? void 0 : option.props.value.toLowerCase().indexOf(input.toLowerCase())) >= 0;
    }
  }, format.map(function (item) {
    return /*#__PURE__*/React.createElement(Select.Option, {
      value: item.name,
      key: item.name
    }, item.name);
  })))));
};
export default SchemaString;