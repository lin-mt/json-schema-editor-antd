import { QuestionCircleOutlined } from '@ant-design/icons';
import { Col, InputNumber, Row, Switch, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { EditorContext } from "../../editor";
var changeOtherValue = function changeOtherValue(value, name, data, change) {
  // @ts-ignore
  data[name] = value;
  change(data);
};
var SchemaArray = function SchemaArray(props) {
  var data = props.data;
  var context = useContext(EditorContext);
  function handleUniqueItemsValueChange(value) {
    changeOtherValue(value, 'uniqueItems', data, context.changeCustomValue);
  }
  function handleMaxItemsValueChange(value) {
    changeOtherValue(value, 'maxItems', data, context.changeCustomValue);
  }
  function handleMinItemsValueChange(value) {
    changeOtherValue(value, 'minItems', data, context.changeCustomValue);
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "default-setting"
  }, "base_setting"), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 6,
    className: "other-label"
  }, /*#__PURE__*/React.createElement("span", null, "uniqueItems\xA0", /*#__PURE__*/React.createElement(Tooltip, {
    title: "unique_items"
  }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, null)), "\xA0\uFF1A")), /*#__PURE__*/React.createElement(Col, {
    span: 18
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: data.uniqueItems,
    onChange: handleUniqueItemsValueChange
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 6,
    className: "other-label"
  }, "min_items \uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 18
  }, /*#__PURE__*/React.createElement(InputNumber, {
    value: data.minItems,
    style: {
      width: '200px'
    },
    placeholder: "minItems",
    onChange: handleMinItemsValueChange
  }))), /*#__PURE__*/React.createElement(Row, {
    className: "other-row",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 6,
    className: "other-label"
  }, "max_items \uFF1A"), /*#__PURE__*/React.createElement(Col, {
    span: 18
  }, /*#__PURE__*/React.createElement(InputNumber, {
    value: data.maxItems,
    style: {
      width: '200px'
    },
    placeholder: "maxItems",
    onChange: handleMaxItemsValueChange
  }))));
};
export default SchemaArray;