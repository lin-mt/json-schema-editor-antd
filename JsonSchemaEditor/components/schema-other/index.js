import React, { useContext } from 'react';
import { EditorContext } from "../editor";
import QuietEditor from "../quiet-editor";
import SchemaArray from "./schema-array";
import SchemaBoolean from "./schema-boolean";
import SchemaNumber from "./schema-number";
import SchemaString from "./schema-string";
var mapping = function mapping(data) {
  switch (data.type) {
    case 'string':
      return /*#__PURE__*/React.createElement(SchemaString, {
        data: data
      });
    case 'number':
      return /*#__PURE__*/React.createElement(SchemaNumber, {
        data: data
      });
    case 'boolean':
      return /*#__PURE__*/React.createElement(SchemaBoolean, {
        data: data
      });
    case 'integer':
      return /*#__PURE__*/React.createElement(SchemaNumber, {
        data: data
      });
    case 'array':
      return /*#__PURE__*/React.createElement(SchemaArray, {
        data: data
      });
    default:
      return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
};
var handleInputEditor = function handleInputEditor(value, change) {
  if (!value) return;
  change(JSON.parse(value));
};
var SchemaOther = function SchemaOther(props) {
  var data = props.data;
  var optionForm = mapping(JSON.parse(data));
  var context = useContext(EditorContext);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", null, optionForm), /*#__PURE__*/React.createElement("div", {
    className: "default-setting"
  }, "all_setting"), /*#__PURE__*/React.createElement(QuietEditor, {
    height: 300,
    value: data,
    language: "json",
    onChange: function onChange(value) {
      return handleInputEditor(value, context.changeCustomValue);
    }
  }));
};
export default SchemaOther;