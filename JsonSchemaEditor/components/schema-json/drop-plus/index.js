import { PlusOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { SchemaMobxContext } from "../../..";
var DropPlus = observer(function (props) {
  var prefix = props.prefix,
    name = props.name;
  var context = useContext(SchemaMobxContext);
  return /*#__PURE__*/React.createElement(Tooltip, {
    placement: "top",
    title: "add_node"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    menu: {
      items: [{
        label: /*#__PURE__*/React.createElement("span", {
          onClick: function onClick() {
            context.addField({
              keys: prefix,
              name: name
            });
          }
        }, "sibling_node"),
        key: 'sibling_node'
      }, {
        label: /*#__PURE__*/React.createElement("span", {
          onClick: function onClick() {
            context.setOpenValue({
              key: prefix.concat(name, 'properties'),
              value: true
            });
            context.addChildField({
              keys: prefix.concat(name, 'properties')
            });
          }
        }, "child_node"),
        key: 'child_node'
      }]
    }
  }, /*#__PURE__*/React.createElement(PlusOutlined, {
    style: {
      color: '#2395f1'
    }
  })));
});
export default DropPlus;