import {
  CaretDownOutlined,
  CaretRightOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Input,
  message,
  Modal,
  Row,
  Select,
  Tabs,
  Tooltip,
} from 'antd';
import { observer } from 'mobx-react';
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from 'react';
import { SCHEMA_TYPE } from '../../constants';
import { SchemaMobxContext } from '../../index';
import Schema from '../../types/Schema';
import { handleSchema } from '../../utils/SchemaUtils';
import MockSelect from '../mock-select';
import QuietEditor from '../quiet-editor';
import SchemaJson from '../schema-json';
import SchemaOther from '../schema-other';
import { createSchema } from './genson-js';

interface EditorContextProp {
  changeCustomValue: (newValue: Schema) => void;
  mock?: boolean;
}

export const EditorContext = createContext<EditorContextProp>({
  changeCustomValue: () => {},
  mock: false,
});

interface EditorProp {
  jsonEditor?: boolean;
  mock?: boolean;
}

const Editor = observer((props: EditorProp): ReactElement => {
  const schemaMobx = useContext(SchemaMobxContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stateVal, setStateVal] = useState<Record<string, any>>({
    visible: false,
    show: true,
    editVisible: false,
    description: '',
    descriptionKey: null,
    advVisible: false,
    itemKey: [],
    curItemCustomValue: null,
    checked: false,
    editorModalName: '', // 弹窗名称 description | mock
    mock: '',
  });

  const [jsonSchemaData, setJsonSchemaData] = useState<string>();
  const [jsonData, setJsonData] = useState<string | undefined>();
  const [importJsonType, setImportJsonType] = useState<string | null>(null);

  // json 导入弹窗
  const showModal = () => {
    setStateVal((prevState) => {
      return { ...prevState, visible: true };
    });
  };

  const handleOk = () => {
    if (importJsonType !== 'schema') {
      if (!jsonData) {
        return;
      }
      let jsonObject = null;
      try {
        jsonObject = JSON.parse(jsonData);
      } catch (ex) {
        message.error('json 数据格式有误').then();
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const jsonDataVal: any = { ...createSchema(jsonObject) };
      schemaMobx.changeSchema(jsonDataVal);
    } else {
      if (!jsonSchemaData) {
        return;
      }
      let jsonObject = null;
      try {
        jsonObject = JSON.parse(jsonSchemaData);
      } catch (ex) {
        message.error('json 数据格式有误').then();
        return;
      }
      schemaMobx.changeSchema(jsonObject);
    }
    setStateVal((prevState) => {
      return { ...prevState, visible: false };
    });
  };

  const handleCancel = () => {
    setStateVal((prevState) => {
      return { ...prevState, visible: false };
    });
  };

  // EditorComponent 中的数据
  const handleParams = (value: string | undefined) => {
    if (!value) return;
    let parseData = JSON.parse(value);
    parseData = handleSchema(parseData);
    schemaMobx.changeSchema(parseData);
  };

  // 修改数据类型
  const handleChangeType = (key: string, value: string) => {
    schemaMobx.changeType({ keys: [key], value });
  };

  const handleImportJson = (value: string | undefined) => {
    if (!value) {
      setJsonData(undefined);
    } else {
      setJsonData(value);
    }
  };

  const handleImportJsonSchema = (value: string | undefined) => {
    if (!value) {
      setJsonSchemaData(undefined);
    } else {
      setJsonSchemaData(value);
    }
  };

  // 增加子节点
  const handleAddChildField = (key: string) => {
    schemaMobx.addChildField({ keys: [key] });
    setStateVal((prevState) => {
      return { ...prevState, show: true };
    });
  };

  const clickIcon = () => {
    setStateVal((prevState) => {
      return { ...prevState, show: !prevState.show };
    });
  };

  // 修改备注信息
  const handleChangeValue = (key: string[], value: string) => {
    let changeValue: string | boolean | { mock: string } = value;
    if (key[0] === 'mock' && value) {
      changeValue = { mock: value };
    }
    schemaMobx.changeValue({ keys: key, value: changeValue });
  };

  // 备注/mock弹窗 点击ok 时
  const handleEditOk = (name: string) => {
    setStateVal((prevState) => {
      return { ...prevState, editVisible: false };
    });
    let value = stateVal[name];
    if (name === 'mock') {
      value = value ? { mock: value } : '';
    }
    schemaMobx.changeValue({ keys: stateVal.descriptionKey, value });
  };

  const handleEditCancel = () => {
    setStateVal((prevState) => {
      return { ...prevState, editVisible: false };
    });
  };

  /**
   * 展示弹窗modal
   * prefix: 节点前缀信息
   * name: 弹窗的名称 ['description', 'mock']
   * value: 输入值
   * type: 如果当前字段是object || array showEdit 不可用
   */
  const showEdit = (
    prefix: string[],
    name: string,
    value?: string | { mock: string },
    type?: string,
  ) => {
    if (type === 'object' || type === 'array') {
      return;
    }
    const descriptionKey = [...prefix].concat(name);
    let inputValue = value;
    if (typeof value !== 'string') {
      inputValue = name === 'mock' ? (value ? value.mock : '') : value;
    }
    setStateVal((prevState) => {
      return {
        ...prevState,
        editVisible: true,
        [name]: inputValue,
        descriptionKey,
        editorModalName: name,
      };
    });
  };

  // 修改备注/mock参数信息
  const changeDesc = (value: string, name: string) => {
    setStateVal((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  // 高级设置
  const handleAdvOk = () => {
    if (stateVal.itemKey.length === 0) {
      schemaMobx.changeSchema(stateVal.curItemCustomValue);
    } else {
      schemaMobx.changeValue({
        keys: stateVal.itemKey,
        value: stateVal.curItemCustomValue,
      });
    }
    setStateVal((prevState) => {
      return { ...prevState, advVisible: false };
    });
  };

  const handleAdvCancel = () => {
    setStateVal((prevState) => {
      return { ...prevState, advVisible: false };
    });
  };

  const showAdv = (key: string[], value?: Schema) => {
    setStateVal((prevState) => {
      return {
        ...prevState,
        advVisible: true,
        itemKey: key,
        curItemCustomValue: value, // 当前节点的数据信息
      };
    });
  };

  //  修改弹窗中的json-schema 值
  const changeCustomValue = (newValue: Schema) => {
    setStateVal((prevState) => {
      return { ...prevState, curItemCustomValue: newValue };
    });
  };

  const changeCheckBox = (value: boolean) => {
    setStateVal((prevState) => {
      return { ...prevState, checked: value };
    });
    schemaMobx.requireAll({ required: value });
  };

  const { visible, editVisible, advVisible, checked, editorModalName } =
    stateVal;

  function handleMockSelectShowEdit() {
    showEdit([], 'mock', schemaMobx.schema.mock, schemaMobx.schema.type);
  }

  return (
    <EditorContext.Provider
      value={{
        changeCustomValue,
        mock: props.mock,
      }}
    >
      <div className="json-schema-react-editor">
        <Button type="primary" onClick={showModal}>
          import_json
        </Button>
        <Modal
          width={750}
          maskClosable={false}
          open={visible}
          title="import_json"
          onOk={handleOk}
          onCancel={handleCancel}
          className="json-schema-react-editor-import-modal"
          okText="ok"
          cancelText="cancel"
          footer={[
            <Button key="back" onClick={handleCancel}>
              cancel
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              ok
            </Button>,
          ]}
        >
          <Tabs
            defaultValue="json"
            onChange={(key) => {
              setImportJsonType(key);
            }}
          >
            <Tabs.TabPane tab="JSON" key="json">
              <QuietEditor
                height={300}
                language="json"
                onChange={handleImportJson}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="JSON-SCHEMA" key="schema">
              <QuietEditor
                height={300}
                language="json"
                onChange={handleImportJsonSchema}
              />
            </Tabs.TabPane>
          </Tabs>
        </Modal>

        <Modal
          title={
            <div>
              {editorModalName}
              &nbsp;
              {editorModalName === 'mock' && (
                <Tooltip title="mockLink">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/YMFE/json-schema-editor-visual/issues/38"
                  >
                    <QuestionCircleOutlined />
                  </a>
                </Tooltip>
              )}
            </div>
          }
          width={750}
          maskClosable={false}
          open={editVisible}
          onOk={() => handleEditOk(editorModalName)}
          onCancel={handleEditCancel}
          okText="ok"
          cancelText="cancel"
        >
          <Input.TextArea
            value={stateVal[editorModalName]}
            placeholder={editorModalName}
            onChange={(event) =>
              changeDesc(event.target.value, editorModalName)
            }
            autoSize={{ minRows: 6, maxRows: 10 }}
          />
        </Modal>

        {advVisible && (
          <Modal
            title="adv_setting"
            width={750}
            maskClosable={false}
            open={advVisible}
            onOk={handleAdvOk}
            onCancel={handleAdvCancel}
            okText="ok"
            cancelText="cancel"
            className="json-schema-react-editor-adv-modal"
          >
            <SchemaOther
              data={JSON.stringify(stateVal.curItemCustomValue, null, 2)}
            />
          </Modal>
        )}

        <Row style={{ marginTop: 10 }}>
          {props.jsonEditor && (
            <Col span={8}>
              <QuietEditor
                height={500}
                value={JSON.stringify(schemaMobx.schema, null, 2)}
                language="json"
                onChange={handleParams}
              />
            </Col>
          )}
          <Col span={props.jsonEditor ? 16 : 24} className="wrapper">
            <Row align="middle" gutter={11}>
              <Col flex="auto">
                <Row align="middle" gutter={11}>
                  <Col span={8}>
                    <Row
                      justify="space-around"
                      align="middle"
                      className="field-name"
                    >
                      <Col flex="20px">
                        {schemaMobx.schema.type === 'object' ? (
                          <span
                            className="show-hide-children"
                            onClick={clickIcon}
                          >
                            {stateVal.show ? (
                              <CaretDownOutlined />
                            ) : (
                              <CaretRightOutlined />
                            )}
                          </span>
                        ) : null}
                      </Col>
                      <Col flex="auto">
                        <Input
                          disabled
                          value="root"
                          addonAfter={
                            <Tooltip placement="top" title="checked_all">
                              <Checkbox
                                style={{ paddingRight: 0 }}
                                checked={checked}
                                disabled={
                                  !(
                                    schemaMobx.schema.type === 'object' ||
                                    schemaMobx.schema.type === 'array'
                                  )
                                }
                                onChange={(event) =>
                                  changeCheckBox(event.target.checked)
                                }
                              />
                            </Tooltip>
                          }
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={props.mock ? 3 : 4}>
                    <Select
                      style={{ width: '100%' }}
                      onChange={(value) => handleChangeType(`type`, value)}
                      value={schemaMobx.schema.type || 'object'}
                    >
                      {SCHEMA_TYPE.map((item, index) => {
                        return (
                          <Select.Option value={item} key={index}>
                            {item}
                          </Select.Option>
                        );
                      })}
                    </Select>
                  </Col>
                  {props.mock && (
                    <Col span={3}>
                      <MockSelect
                        schema={schemaMobx.schema}
                        showEdit={handleMockSelectShowEdit}
                        onChange={(value) => handleChangeValue(['mock'], value)}
                      />
                    </Col>
                  )}
                  <Col span={props.mock ? 5 : 6}>
                    <Input
                      placeholder="title"
                      value={schemaMobx.schema.title}
                      onChange={(ele) =>
                        handleChangeValue(['title'], ele.target.value)
                      }
                      addonAfter={
                        <EditOutlined
                          className="input-icon-editor"
                          onClick={() =>
                            showEdit([], 'title', schemaMobx.schema.title)
                          }
                        />
                      }
                    />
                  </Col>
                  <Col span={props.mock ? 5 : 6}>
                    <Input
                      addonAfter={
                        <EditOutlined
                          onClick={() =>
                            showEdit(
                              [],
                              'description',
                              schemaMobx.schema.description,
                            )
                          }
                        />
                      }
                      placeholder="description"
                      value={schemaMobx.schema.description}
                      onChange={(ele) =>
                        handleChangeValue(['description'], ele.target.value)
                      }
                    />
                  </Col>
                </Row>
              </Col>
              <Col flex="66px">
                <Row gutter={8}>
                  <Col span={8}>
                    <span
                      className="adv-set"
                      onClick={() => showAdv([], schemaMobx.schema)}
                    >
                      <Tooltip placement="top" title="adv_setting">
                        <SettingOutlined />
                      </Tooltip>
                    </span>
                  </Col>
                  <Col span={8}>
                    {schemaMobx.schema.type === 'object' ? (
                      <span
                        className="plus"
                        onClick={() => handleAddChildField('properties')}
                      >
                        <Tooltip placement="top" title="add_child_node">
                          <PlusOutlined />
                        </Tooltip>
                      </span>
                    ) : null}
                  </Col>
                </Row>
              </Col>
            </Row>
            {stateVal.show && (
              <SchemaJson showEdit={showEdit} showAdv={showAdv} />
            )}
          </Col>
        </Row>
      </div>
    </EditorContext.Provider>
  );
});

export default Editor;
