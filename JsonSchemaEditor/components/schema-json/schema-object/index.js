import React from 'react';
import SchemaItem from "../schema-item";
var SchemaObject = function SchemaObject(props) {
  var data = props.data,
    prefix = props.prefix,
    showEdit = props.showEdit,
    showAdv = props.showAdv;
  return /*#__PURE__*/React.createElement("div", null, data.properties && Object.keys(data.properties).map(function (name, index) {
    return /*#__PURE__*/React.createElement(SchemaItem, {
      key: index,
      data: data,
      name: name,
      prefix: prefix,
      showEdit: showEdit,
      showAdv: showAdv
    });
  }));
};
export default SchemaObject;