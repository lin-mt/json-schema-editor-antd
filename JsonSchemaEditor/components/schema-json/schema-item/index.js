function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
import { CaretDownOutlined, CaretRightOutlined, CloseOutlined, EditOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Checkbox, Col, Input, message, Row, Select, Tooltip } from 'antd';
import _ from 'lodash';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { SchemaMobxContext } from "../../..";
import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from "../../../constants";
import { EditorContext } from "../../editor";
import FieldInput from "../../field-input";
import MockSelect from "../../mock-select";
import DropPlus from "../drop-plus";
import { mapping } from "../index";
var Option = Select.Option;
var SchemaItem = observer(function (props) {
  var data = props.data,
    name = props.name,
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
    return _toConsumableArray(prefix).concat(name);
  };

  // 修改节点字段名
  var handleChangeName = function handleChangeName(value) {
    if (!data.properties || data.properties[value] && _typeof(data.properties[value]) === 'object') {
      message.error("The field \"".concat(value, "\" already exists.")).then();
      return false;
    }
    mobxContext.changeName({
      keys: prefix,
      name: name,
      value: value
    });
    return true;
  };

  // 修改备注信息
  var handleChangeDesc = function handleChangeDesc(value) {
    var key = getPrefix().concat('description');
    mobxContext.changeValue({
      keys: key,
      value: value
    });
  };

  // 修改mock 信息
  // noinspection DuplicatedCode
  var handleChangeMock = function handleChangeMock(mockValue) {
    var key = getPrefix().concat('mock');
    var value = mockValue ? {
      mock: mockValue
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

  // 修改数据类型
  var handleChangeType = function handleChangeType(value) {
    var keys = getPrefix().concat('type');
    mobxContext.changeType({
      keys: keys,
      value: value
    });
  };
  var handleDeleteItem = function handleDeleteItem() {
    mobxContext.deleteField({
      keys: getPrefix()
    });
    mobxContext.enableRequire({
      keys: prefix,
      name: name,
      required: false
    });
  };

  /*
  展示备注编辑弹窗
  editorName: 弹窗名称 ['description', 'mock']
  type: 如果当前字段是object || array showEdit 不可用
  */
  var handleShowEdit = function handleShowEdit(editorName, type) {
    // @ts-ignore
    showEdit(getPrefix(), editorName, data.properties[name][editorName], type);
  };
  var handleShowAdv = function handleShowAdv() {
    // @ts-ignore
    showAdv(getPrefix(), data.properties[name]);
  };

  //  增加子节点
  var handleAddField = function handleAddField(type) {
    if (type === 'object') {
      return;
    }
    mobxContext.addField({
      keys: prefix,
      name: name
    });
  };

  // 控制三角形按钮
  var handleClickIcon = function handleClickIcon() {
    // 数据存储在 properties.xxx.properties 下
    var keyArr = _toConsumableArray(getPrefix()).concat('properties');
    mobxContext.setOpenValue({
      key: keyArr
    });
  };

  // 修改是否必须
  var handleEnableRequire = function handleEnableRequire(checked) {
    mobxContext.enableRequire({
      keys: prefix,
      name: name,
      required: checked
    });
  };

  // @ts-ignore
  var value = data.properties[name];
  var prefixArray = _toConsumableArray(prefix).concat(name);
  var prefixArrayStr = _toConsumableArray(prefixArray).concat('properties').join(JSONPATH_JOIN_CHAR);
  return _.get(mobxContext.open, prefix.join(JSONPATH_JOIN_CHAR)) ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Row, {
    justify: "space-around",
    gutter: 11,
    align: "middle"
  }, /*#__PURE__*/React.createElement(Col, {
    flex: "auto"
  }, /*#__PURE__*/React.createElement(Row, {
    justify: "space-around",
    gutter: 11,
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
  }, value.type === 'object' ? /*#__PURE__*/React.createElement("span", {
    className: "show-hide-children",
    onClick: handleClickIcon
  }, _.get(mobxContext.open, [prefixArrayStr]) ? /*#__PURE__*/React.createElement(CaretDownOutlined, null) : /*#__PURE__*/React.createElement(CaretRightOutlined, null)) : null), /*#__PURE__*/React.createElement(Col, {
    flex: "auto"
  }, /*#__PURE__*/React.createElement(FieldInput, {
    addonAfter: /*#__PURE__*/React.createElement(Tooltip, {
      placement: "top",
      title: "required"
    }, /*#__PURE__*/React.createElement(Checkbox, {
      style: {
        paddingLeft: 0
      },
      onChange: function onChange(event) {
        return handleEnableRequire(event.target.checked);
      },
      checked: data.required === undefined ? false : data.required.indexOf(name) !== -1
    })),
    onChange: handleChangeName,
    value: name
  })))), /*#__PURE__*/React.createElement(Col, {
    span: context.mock ? 3 : 4
  }, /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%'
    },
    onChange: handleChangeType,
    value: value.type
  }, SCHEMA_TYPE.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Option, {
      value: item,
      key: index
    }, item);
  }))), context.mock && /*#__PURE__*/React.createElement(Col, {
    span: 3
  }, /*#__PURE__*/React.createElement(MockSelect, {
    schema: value,
    showEdit: function showEdit() {
      return handleShowEdit('mock', value.type);
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
    value: value.title,
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
    value: value.description,
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
  }, /*#__PURE__*/React.createElement("span", {
    className: "close",
    onClick: handleDeleteItem
  }, /*#__PURE__*/React.createElement(CloseOutlined, null))), /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, /*#__PURE__*/React.createElement("span", {
    className: "plus",
    onClick: function onClick() {
      return handleAddField(value.type);
    }
  }, value.type === 'object' ? /*#__PURE__*/React.createElement(DropPlus, {
    prefix: prefix,
    name: name
  }) : /*#__PURE__*/React.createElement(Tooltip, {
    placement: "top",
    title: "add_sibling_node"
  }, /*#__PURE__*/React.createElement(PlusOutlined, null))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, mapping(prefixArray, value, showEdit, showAdv))) : null;
});
export default SchemaItem;