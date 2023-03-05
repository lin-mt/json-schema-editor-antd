function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { CaretDownOutlined, CaretRightOutlined, EditOutlined, PlusOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Input, message, Modal, Row, Select, Tabs, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React, { createContext, useContext, useState } from 'react';
import { SCHEMA_TYPE } from "../../constants";
import { SchemaMobxContext } from "../../index";
import { handleSchema } from "../../utils/SchemaUtils";
import MockSelect from "../mock-select";
import QuietEditor from "../quiet-editor";
import SchemaJson from "../schema-json";
import SchemaOther from "../schema-other";
import { createSchema } from "./genson-js";
export var EditorContext = /*#__PURE__*/createContext({
  changeCustomValue: function changeCustomValue() {},
  mock: false
});
var Editor = observer(function (props) {
  var schemaMobx = useContext(SchemaMobxContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var _useState = useState({
      visible: false,
      show: true,
      editVisible: false,
      description: '',
      descriptionKey: null,
      advVisible: false,
      itemKey: [],
      curItemCustomValue: null,
      checked: false,
      editorModalName: '',
      // 弹窗名称 description | mock
      mock: ''
    }),
    _useState2 = _slicedToArray(_useState, 2),
    stateVal = _useState2[0],
    setStateVal = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    jsonSchemaData = _useState4[0],
    setJsonSchemaData = _useState4[1];
  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    jsonData = _useState6[0],
    setJsonData = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    importJsonType = _useState8[0],
    setImportJsonType = _useState8[1];

  // json 导入弹窗
  var showModal = function showModal() {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        visible: true
      });
    });
  };
  var handleOk = function handleOk() {
    if (importJsonType !== 'schema') {
      if (!jsonData) {
        return;
      }
      var jsonObject = null;
      try {
        jsonObject = JSON.parse(jsonData);
      } catch (ex) {
        message.error('json 数据格式有误').then();
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var jsonDataVal = _objectSpread({}, createSchema(jsonObject));
      schemaMobx.changeSchema(jsonDataVal);
    } else {
      if (!jsonSchemaData) {
        return;
      }
      var _jsonObject = null;
      try {
        _jsonObject = JSON.parse(jsonSchemaData);
      } catch (ex) {
        message.error('json 数据格式有误').then();
        return;
      }
      schemaMobx.changeSchema(_jsonObject);
    }
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        visible: false
      });
    });
  };
  var handleCancel = function handleCancel() {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        visible: false
      });
    });
  };

  // EditorComponent 中的数据
  var handleParams = function handleParams(value) {
    if (!value) return;
    var parseData = JSON.parse(value);
    parseData = handleSchema(parseData);
    schemaMobx.changeSchema(parseData);
  };

  // 修改数据类型
  var handleChangeType = function handleChangeType(key, value) {
    schemaMobx.changeType({
      keys: [key],
      value: value
    });
  };
  var handleImportJson = function handleImportJson(value) {
    if (!value) {
      setJsonData(undefined);
    } else {
      setJsonData(value);
    }
  };
  var handleImportJsonSchema = function handleImportJsonSchema(value) {
    if (!value) {
      setJsonSchemaData(undefined);
    } else {
      setJsonSchemaData(value);
    }
  };

  // 增加子节点
  var handleAddChildField = function handleAddChildField(key) {
    schemaMobx.addChildField({
      keys: [key]
    });
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        show: true
      });
    });
  };
  var clickIcon = function clickIcon() {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        show: !prevState.show
      });
    });
  };

  // 修改备注信息
  var handleChangeValue = function handleChangeValue(key, value) {
    var changeValue = value;
    if (key[0] === 'mock' && value) {
      changeValue = {
        mock: value
      };
    }
    schemaMobx.changeValue({
      keys: key,
      value: changeValue
    });
  };

  // 备注/mock弹窗 点击ok 时
  var handleEditOk = function handleEditOk(name) {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        editVisible: false
      });
    });
    var value = stateVal[name];
    if (name === 'mock') {
      value = value ? {
        mock: value
      } : '';
    }
    schemaMobx.changeValue({
      keys: stateVal.descriptionKey,
      value: value
    });
  };
  var handleEditCancel = function handleEditCancel() {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        editVisible: false
      });
    });
  };

  /**
   * 展示弹窗modal
   * prefix: 节点前缀信息
   * name: 弹窗的名称 ['description', 'mock']
   * value: 输入值
   * type: 如果当前字段是object || array showEdit 不可用
   */
  var showEdit = function showEdit(prefix, name, value, type) {
    if (type === 'object' || type === 'array') {
      return;
    }
    var descriptionKey = _toConsumableArray(prefix).concat(name);
    var inputValue = value;
    if (typeof value !== 'string') {
      inputValue = name === 'mock' ? value ? value.mock : '' : value;
    }
    setStateVal(function (prevState) {
      var _objectSpread2;
      return _objectSpread(_objectSpread({}, prevState), {}, (_objectSpread2 = {
        editVisible: true
      }, _defineProperty(_objectSpread2, name, inputValue), _defineProperty(_objectSpread2, "descriptionKey", descriptionKey), _defineProperty(_objectSpread2, "editorModalName", name), _objectSpread2));
    });
  };

  // 修改备注/mock参数信息
  var changeDesc = function changeDesc(value, name) {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, _defineProperty({}, name, value));
    });
  };

  // 高级设置
  var handleAdvOk = function handleAdvOk() {
    if (stateVal.itemKey.length === 0) {
      schemaMobx.changeSchema(stateVal.curItemCustomValue);
    } else {
      schemaMobx.changeValue({
        keys: stateVal.itemKey,
        value: stateVal.curItemCustomValue
      });
    }
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        advVisible: false
      });
    });
  };
  var handleAdvCancel = function handleAdvCancel() {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        advVisible: false
      });
    });
  };
  var showAdv = function showAdv(key, value) {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        advVisible: true,
        itemKey: key,
        curItemCustomValue: value // 当前节点的数据信息
      });
    });
  };

  //  修改弹窗中的json-schema 值
  var changeCustomValue = function changeCustomValue(newValue) {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        curItemCustomValue: newValue
      });
    });
  };
  var changeCheckBox = function changeCheckBox(value) {
    setStateVal(function (prevState) {
      return _objectSpread(_objectSpread({}, prevState), {}, {
        checked: value
      });
    });
    schemaMobx.requireAll({
      required: value
    });
  };
  var visible = stateVal.visible,
    editVisible = stateVal.editVisible,
    advVisible = stateVal.advVisible,
    checked = stateVal.checked,
    editorModalName = stateVal.editorModalName;
  function handleMockSelectShowEdit() {
    showEdit([], 'mock', schemaMobx.schema.mock, schemaMobx.schema.type);
  }
  return /*#__PURE__*/React.createElement(EditorContext.Provider, {
    value: {
      changeCustomValue: changeCustomValue,
      mock: props.mock
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "json-schema-react-editor"
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    onClick: showModal
  }, "import_json"), /*#__PURE__*/React.createElement(Modal, {
    width: 750,
    maskClosable: false,
    open: visible,
    title: "import_json",
    onOk: handleOk,
    onCancel: handleCancel,
    className: "json-schema-react-editor-import-modal",
    okText: "ok",
    cancelText: "cancel",
    footer: [/*#__PURE__*/React.createElement(Button, {
      key: "back",
      onClick: handleCancel
    }, "cancel"), /*#__PURE__*/React.createElement(Button, {
      key: "submit",
      type: "primary",
      onClick: handleOk
    }, "ok")]
  }, /*#__PURE__*/React.createElement(Tabs, {
    defaultValue: "json",
    onChange: function onChange(key) {
      setImportJsonType(key);
    }
  }, /*#__PURE__*/React.createElement(Tabs.TabPane, {
    tab: "JSON",
    key: "json"
  }, /*#__PURE__*/React.createElement(QuietEditor, {
    height: 300,
    language: "json",
    onChange: handleImportJson
  })), /*#__PURE__*/React.createElement(Tabs.TabPane, {
    tab: "JSON-SCHEMA",
    key: "schema"
  }, /*#__PURE__*/React.createElement(QuietEditor, {
    height: 300,
    language: "json",
    onChange: handleImportJsonSchema
  })))), /*#__PURE__*/React.createElement(Modal, {
    title: /*#__PURE__*/React.createElement("div", null, editorModalName, "\xA0", editorModalName === 'mock' && /*#__PURE__*/React.createElement(Tooltip, {
      title: "mockLink"
    }, /*#__PURE__*/React.createElement("a", {
      target: "_blank",
      rel: "noopener noreferrer",
      href: "https://github.com/YMFE/json-schema-editor-visual/issues/38"
    }, /*#__PURE__*/React.createElement(QuestionCircleOutlined, null)))),
    width: 750,
    maskClosable: false,
    open: editVisible,
    onOk: function onOk() {
      return handleEditOk(editorModalName);
    },
    onCancel: handleEditCancel,
    okText: "ok",
    cancelText: "cancel"
  }, /*#__PURE__*/React.createElement(Input.TextArea, {
    value: stateVal[editorModalName],
    placeholder: editorModalName,
    onChange: function onChange(event) {
      return changeDesc(event.target.value, editorModalName);
    },
    autoSize: {
      minRows: 6,
      maxRows: 10
    }
  })), advVisible && /*#__PURE__*/React.createElement(Modal, {
    title: "adv_setting",
    width: 750,
    maskClosable: false,
    open: advVisible,
    onOk: handleAdvOk,
    onCancel: handleAdvCancel,
    okText: "ok",
    cancelText: "cancel",
    className: "json-schema-react-editor-adv-modal"
  }, /*#__PURE__*/React.createElement(SchemaOther, {
    data: JSON.stringify(stateVal.curItemCustomValue, null, 2)
  })), /*#__PURE__*/React.createElement(Row, {
    style: {
      marginTop: 10
    }
  }, props.jsonEditor && /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, /*#__PURE__*/React.createElement(QuietEditor, {
    height: 500,
    value: JSON.stringify(schemaMobx.schema, null, 2),
    language: "json",
    onChange: handleParams
  })), /*#__PURE__*/React.createElement(Col, {
    span: props.jsonEditor ? 16 : 24,
    className: "wrapper"
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle",
    gutter: 11
  }, /*#__PURE__*/React.createElement(Col, {
    flex: "auto"
  }, /*#__PURE__*/React.createElement(Row, {
    align: "middle",
    gutter: 11
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, /*#__PURE__*/React.createElement(Row, {
    justify: "space-around",
    align: "middle",
    className: "field-name"
  }, /*#__PURE__*/React.createElement(Col, {
    flex: "20px"
  }, schemaMobx.schema.type === 'object' ? /*#__PURE__*/React.createElement("span", {
    className: "show-hide-children",
    onClick: clickIcon
  }, stateVal.show ? /*#__PURE__*/React.createElement(CaretDownOutlined, null) : /*#__PURE__*/React.createElement(CaretRightOutlined, null)) : null), /*#__PURE__*/React.createElement(Col, {
    flex: "auto"
  }, /*#__PURE__*/React.createElement(Input, {
    disabled: true,
    value: "root",
    addonAfter: /*#__PURE__*/React.createElement(Tooltip, {
      placement: "top",
      title: "checked_all"
    }, /*#__PURE__*/React.createElement(Checkbox, {
      style: {
        paddingRight: 0
      },
      checked: checked,
      disabled: !(schemaMobx.schema.type === 'object' || schemaMobx.schema.type === 'array'),
      onChange: function onChange(event) {
        return changeCheckBox(event.target.checked);
      }
    }))
  })))), /*#__PURE__*/React.createElement(Col, {
    span: props.mock ? 3 : 4
  }, /*#__PURE__*/React.createElement(Select, {
    style: {
      width: '100%'
    },
    onChange: function onChange(value) {
      return handleChangeType("type", value);
    },
    value: schemaMobx.schema.type || 'object'
  }, SCHEMA_TYPE.map(function (item, index) {
    return /*#__PURE__*/React.createElement(Select.Option, {
      value: item,
      key: index
    }, item);
  }))), props.mock && /*#__PURE__*/React.createElement(Col, {
    span: 3
  }, /*#__PURE__*/React.createElement(MockSelect, {
    schema: schemaMobx.schema,
    showEdit: handleMockSelectShowEdit,
    onChange: function onChange(value) {
      return handleChangeValue(['mock'], value);
    }
  })), /*#__PURE__*/React.createElement(Col, {
    span: props.mock ? 5 : 6
  }, /*#__PURE__*/React.createElement(Input, {
    placeholder: "title",
    value: schemaMobx.schema.title,
    onChange: function onChange(ele) {
      return handleChangeValue(['title'], ele.target.value);
    },
    addonAfter: /*#__PURE__*/React.createElement(EditOutlined, {
      className: "input-icon-editor",
      onClick: function onClick() {
        return showEdit([], 'title', schemaMobx.schema.title);
      }
    })
  })), /*#__PURE__*/React.createElement(Col, {
    span: props.mock ? 5 : 6
  }, /*#__PURE__*/React.createElement(Input, {
    addonAfter: /*#__PURE__*/React.createElement(EditOutlined, {
      onClick: function onClick() {
        return showEdit([], 'description', schemaMobx.schema.description);
      }
    }),
    placeholder: "description",
    value: schemaMobx.schema.description,
    onChange: function onChange(ele) {
      return handleChangeValue(['description'], ele.target.value);
    }
  })))), /*#__PURE__*/React.createElement(Col, {
    flex: "66px"
  }, /*#__PURE__*/React.createElement(Row, {
    gutter: 8
  }, /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, /*#__PURE__*/React.createElement("span", {
    className: "adv-set",
    onClick: function onClick() {
      return showAdv([], schemaMobx.schema);
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    placement: "top",
    title: "adv_setting"
  }, /*#__PURE__*/React.createElement(SettingOutlined, null)))), /*#__PURE__*/React.createElement(Col, {
    span: 8
  }, schemaMobx.schema.type === 'object' ? /*#__PURE__*/React.createElement("span", {
    className: "plus",
    onClick: function onClick() {
      return handleAddChildField('properties');
    }
  }, /*#__PURE__*/React.createElement(Tooltip, {
    placement: "top",
    title: "add_child_node"
  }, /*#__PURE__*/React.createElement(PlusOutlined, null))) : null)))), stateVal.show && /*#__PURE__*/React.createElement(SchemaJson, {
    showEdit: showEdit,
    showAdv: showAdv
  })))));
});
export default Editor;