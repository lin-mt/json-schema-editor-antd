function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { CaretDownOutlined, CaretRightOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Checkbox, Col, Input, Row, Select, Tooltip } from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { SchemaMobxContext } from "../../..";
import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from "../../../constants";
import { EditorContext } from "../../editor";
import MockSelect from "../../mock-select";
import { mapping } from "../index";
var SchemaArray = observer(function (props) {
  var data = props.data,
    prefix = props.prefix,
    showAdv = props.showAdv,
    showEdit = props.showEdit;

  // noinspection DuplicatedCode
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    tagPaddingLeftStyle = _useState2[0],
    setTagPaddingLeftStyle = _useState2[1];
  var context = useContext(EditorContext);
  var mobxContext = useContext(SchemaMobxContext);
  useEffect(function () {
    var length = props.prefix.filter(function (name) {
      return name !== 'properties';
    }).length;
    setTagPaddingLeftStyle({
      paddingLeft: "".concat(20 * (length + 1), "px")
    });
  }, [props.prefix]);
  var getPrefix = function getPrefix() {
    return _toConsumableArray(prefix).concat('items');
  };

  // 修改数据类型
  var handleChangeType = function handleChangeType(value) {
    var keys = getPrefix().concat('type');
    mobxContext.changeType({
      keys: keys,
      value: value
    });
  };

  // 修改备注信息
  var handleChangeDesc = function handleChangeDesc(value) {
    var key = getPrefix().concat("description");
    mobxContext.changeValue({
      keys: key,
      value: value
    });
  };

  // 修改mock信息
  var handleChangeMock = function handleChangeMock(e) {
    var key = getPrefix().concat('mock');
    var value = e ? {
      mock: e
    } : '';
    mobxContext.changeValue({
      keys: key,
      value: value
    });
  };
  var handleChangeTitle = function handleChangeTitle(value) {
    var key = getPrefix().concat('title');
    mobxContext.changeValue({
      keys: key,
      value: value
    });
  };

  // 增加子节点
  var handleAddChildField = function handleAddChildField() {
    var keyArr = getPrefix().concat('properties');
    mobxContext.addChildField({
      keys: keyArr
    });
    mobxContext.setOpenValue({
      key: keyArr,
      value: true
    });
  };
  var handleClickIcon = function handleClickIcon() {
    // 数据存储在 properties.name.properties下
    var keyArr = getPrefix().concat('properties');
    mobxContext.setOpenValue({
      key: keyArr
    });
  };
  var handleShowEdit = function handleShowEdit(name, type) {
    // @ts-ignore
    showEdit(getPrefix(), name, data.items[name], type);
  };
  var handleShowAdv = function handleShowAdv() {
    showAdv(getPrefix(), data.items);
  };
  var items = data.items;
  var prefixArray = _toConsumableArray(prefix).concat('items');
  var prefixArrayStr = _toConsumableArray(prefixArray).concat('properties').join(JSONPATH_JOIN_CHAR);
  return data.items !== undefined ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
    gutter: 11,
    justify: "space-around",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    flex: "auto"
  }, /*#__PURE__*/React.createElement(Row, {
    gutter: 11,
    justify: "space-around",
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8,
    style: tagPaddingLeftStyle
  }, /*#__PURE__*/React.createElement(Row, {
    justify: "space-around",
    align: "middle",
    className: "field-name"
  }, /*#__PURE__*/React.createElement(Col, {
    flex: "20px"
  }, (items === null || items === void 0 ? void 0 : items.type) === 'object' ? /*#__PURE__*/React.createElement("span", {
    className: "show-hide-children",
    onClick: handleClickIcon
  }, _.get(mobxContext.open, [prefixArrayStr]) ? /*#__PURE__*/React.createElement(CaretDownOutlined, null) : /*#__PURE__*/React.createElement(CaretRightOutlined, null)) : null), /*#__PURE__*/React.createElement(Col, {
    flex: "auto"
  }, /*#__PURE__*/React.createElement(Input, {
    addonAfter: /*#__PURE__*/React.createElement(Checkbox, {
      style: {
        paddingLeft: 0
      },
      disabled: true
    }),
    disabled: true,
    value: "Items"
  })))), /*#__PURE__*/React.createElement(Col, {
    span: context.mock ? 3 : 4
  }, /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%'
    },
    onChange: handleChangeType,
    value: items === null || items === void 0 ? void 0 : items.type
  }, SCHEMA_TYPE.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Select.Option, {
      value: item,
      key: index
    }, item);
  }))), context.mock && /*#__PURE__*/React.createElement(Col, {
    span: 3
  }, /*#__PURE__*/React.createElement(MockSelect, {
    schema: items,
    showEdit: function showEdit() {
      return handleShowEdit('mock', items === null || items === void 0 ? void 0 : items.type);
    },
    onChange: handleChangeMock
  })), /*#__PURE__*/React.createElement(Col, {
    span: context.mock ? 5 : 6
  }, /*#__PURE__*/React.createElement(Input, {
    addonAfter: /*#__PURE__*/React.createElement(EditOutlined, {
      className: "input-icon-editor",
      onClick: function onClick() {
        return handleShowEdit('title');
      }
    }),
    placeholder: "title",
    value: items === null || items === void 0 ? void 0 : items.title,
    onChange: function onChange(event) {
      return handleChangeTitle(event.target.value);
    }
  })), /*#__PURE__*/React.createElement(Col, {
    span: context.mock ? 5 : 6
  }, /*#__PURE__*/React.createElement(Input, {
    addonAfter: /*#__PURE__*/React.createElement(EditOutlined, {
      className: "input-icon-editor",
      onClick: function onClick() {
        return handleShowEdit('description');
      }
    }),
    placeholder: "description",
    value: items === null || items === void 0 ? void 0 : items.description,
    onChange: function onChange(event) {
      return handleChangeDesc(event.target.value);
    }
  })))), /*#__PURE__*/React.createElement(Col, {
    flex: "66px"
  }, /*#__PURE__*/React.createElement(Row, {
    gutter: 8
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, /*#__PURE__*/React.createElement("span", {
    className: "adv-set",
    onClick: handleShowAdv
  }, /*#__PURE__*/React.createElement(Tooltip, {
    placement: "top",
    title: "adv_setting"
  }, /*#__PURE__*/React.createElement(SettingOutlined, null)))), /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, (items === null || items === void 0 ? void 0 : items.type) === 'object' ? /*#__PURE__*/React.createElement("span", {
    className: "plus",
    onClick: handleAddChildField
  }, /*#__PURE__*/React.createElement(Tooltip, {
    placement: "top",
    title: "add_child_node"
  }, /*#__PURE__*/React.createElement(PlusOutlined, null))) : null)))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, mapping(prefixArray, items, showEdit, showAdv))) : /*#__PURE__*/React.createElement(React.Fragment, null);
});
export default SchemaArray;