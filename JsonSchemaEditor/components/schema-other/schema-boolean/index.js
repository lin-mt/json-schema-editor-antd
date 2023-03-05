import { Col, Row, Select } from 'antd';
import _ from 'lodash';
import React, { useContext } from 'react';
import { EditorContext } from "../../editor";
var Option = Select.Option;
var changeOtherValue = function changeOtherValue(value, name, data, change) {
  var valueForChange = value === 'true';
  var newData = _.cloneDeep(data);
  if (typeof value === 'undefined') {
    // @ts-ignore
    delete newData[name];
  } else {
    // @ts-ignore
    newData[name] = valueForChange;
  }
  change(newData);
};
var SchemaBoolean = function SchemaBoolean(props) {
  var data = props.data;
  var context = useContext(EditorContext);
  var value = data.default === undefined ? '' : data.default ? 'true' : 'false';
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
  }, /*#__PURE__*/React.createElement(Select, {
    value: value,
    allowClear: true,
    placeholder: "default",
    style: {
      width: 200
    },
    onChange: function onChange(value) {
      changeOtherValue(value, 'default', data, context.changeCustomValue);
    }
  }, /*#__PURE__*/React.createElement(Option, {
    value: "true"
  }, "true"), /*#__PURE__*/React.createElement(Option, {
    value: "false"
  }, "false")))));
};
export default SchemaBoolean;