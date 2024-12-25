import {
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  ImportOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Switch,
  theme,
  Tooltip,
} from 'antd';
import { Draft07 } from 'json-schema-library';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MonacoEditor from '../MonacoEditor';
import { JSONSchema7 } from '../types';
import {
  getDefaultSchema,
  getPropertyIndex,
  parseJsonStr,
  resolveJsonSchemaRef,
  SchemaTypeOptions,
  SchemaTypes,
  StringFormat,
} from '../utils';

type SchemaItemProps = {
  propertyName?: string;
  nodeDepth?: number;
  parentSchemaDepth?: number;
  namePath?: number[];
  isArrayItems?: boolean;
  schema: JSONSchema7;
  changeSchema?: (namePath: number[], value: any, propertyName: string) => void;
  renameProperty?: (namePath: number[], name: string) => void;
  removeProperty?: (namePath: number[]) => void;
  addProperty?: (path: number[], isChild: boolean) => void;
  updateRequiredProperty?: (
    path: number[],
    requiredProperty: string,
    removed: boolean,
  ) => void;
};

function SchemaItem(props: SchemaItemProps) {
  const { token } = theme.useToken();
  const [advancedForm] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    changeSchema,
    renameProperty,
    isArrayItems,
    updateRequiredProperty,
    parentSchemaDepth = 0,
    removeProperty,
    addProperty,
  } = props;

  const [schema, setSchema] = useState(props.schema);
  const [formSchema, setFormSchema] = useState<any>();
  const [propertyName, setPropertyName] = useState(props.propertyName);
  const [schemaTitle, setSchemaTitle] = useState(schema.title);
  const [schemaDescription, setSchemaDescription] = useState(
    schema.description,
  );
  const [nodeDepth, setNodeDepth] = useState(
    props.nodeDepth ? props.nodeDepth : 0,
  );
  const [namePath, setNamePath] = useState<number[]>(
    props.namePath ? props.namePath : [],
  );
  const [expand, setExpand] = useState(true);
  const [advancedModal, setAdvancedModal] = useState(false);
  const [importModal, setImportModal] = useState(false);
  const [importType, setImportType] = useState<'json' | 'json-schema'>('json');
  const [importValue, setImportValue] = useState<string | undefined>();
  const [isObject, setIsObject] = useState(false);
  const [isArray, setIsArray] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isInteger, setIsInteger] = useState(false);
  const [isString, setIsString] = useState(false);
  const editorRef = useRef<any>(null);
  const isRoot = typeof propertyName === 'undefined';

  useEffect(() => {
    setSchema(props.schema);
  }, [props.schema]);

  useEffect(() => {
    setNamePath(props.namePath ? props.namePath : []);
  }, [props.namePath]);

  useEffect(() => {
    setNodeDepth(props.nodeDepth ? props.nodeDepth : 0);
  }, [props.nodeDepth]);

  const handleDebounce = useCallback(
    _.debounce(
      (callback) => {
        if (typeof callback === 'function') {
          callback();
        } else {
          console.log('Provided argument is not a function');
        }
      },
      300,
      { maxWait: 1000 },
    ),
    [],
  );

  useEffect(() => {
    return () => {
      handleDebounce.cancel();
    };
  }, [handleDebounce]);

  useEffect(() => {
    if (!advancedModal || !formSchema) {
      return;
    }
    advancedForm.setFieldsValue(formSchema);
    setIsObject(formSchema.type === 'object');
    setIsArray(formSchema.type === 'array');
    setIsNumber(formSchema.type === 'number');
    setIsBoolean(formSchema.type === 'boolean');
    setIsInteger(formSchema.type === 'integer');
    setIsString(formSchema.type === 'string');
  }, [advancedModal, formSchema]);

  function handleEditorDidMount(editor: any) {
    editorRef.current = editor;
  }

  const schemaItems: any = schema.items;
  const addChildItems =
    !!(
      schema.type === 'object' ||
      (isArrayItems && schemaItems?.type === 'object')
    ) &&
    !isArrayItems &&
    !isRoot;

  if (!schema.type) {
    return <></>;
  }

  return (
    <>
      {contextHolder}
      <Row align={'middle'} style={{ paddingBottom: 10 }}>
        <Col
          flex={`${24 + nodeDepth * 17}px`}
          style={{ marginLeft: nodeDepth * 5 }}
        >
          <Row justify={'end'}>
            {schema.type === 'object' && (
              <Button
                type={'text'}
                size={'small'}
                icon={expand ? <CaretDownOutlined /> : <CaretRightOutlined />}
                onClick={() => setExpand(!expand)}
              />
            )}
          </Row>
        </Col>
        <Col flex={'auto'} style={{ marginLeft: 5 }}>
          <Input
            status={!isRoot && propertyName.length === 0 ? 'error' : undefined}
            disabled={isRoot || isArrayItems}
            value={isRoot ? 'root' : propertyName}
            placeholder={'属性名称'}
            onBlur={() => {
              if (propertyName?.length === 0) {
                messageApi.error('属性名称不能为空');
                return;
              }
              if (
                renameProperty &&
                propertyName &&
                propertyName?.length !== 0
              ) {
                renameProperty(namePath, propertyName);
              }
            }}
            onChange={(name) => setPropertyName(name.target.value)}
          />
        </Col>
        <Col flex={'16px'} style={{ marginLeft: 5 }}>
          <Checkbox
            disabled={isArrayItems || isRoot}
            onChange={(e) => {
              if (updateRequiredProperty && propertyName) {
                updateRequiredProperty(
                  namePath.slice(0, parentSchemaDepth),
                  propertyName,
                  !e.target.checked,
                );
              }
            }}
          />
        </Col>
        <Col flex={'95px'} style={{ marginLeft: 5 }}>
          <Select
            style={{ width: '95px' }}
            value={schema.type}
            options={SchemaTypeOptions}
            onChange={(type) => {
              if (changeSchema) {
                changeSchema(namePath, getDefaultSchema(type), 'type');
              }
            }}
          />
        </Col>
        <Col flex={'auto'} style={{ marginLeft: 5 }}>
          <Input
            placeholder={'标题'}
            value={schemaTitle}
            onBlur={() => {
              if (changeSchema) {
                changeSchema(
                  namePath.concat(getPropertyIndex(schema, 'title')),
                  schemaTitle,
                  'title',
                );
              }
            }}
            onChange={(title) => setSchemaTitle(title.target.value)}
          />
        </Col>
        <Col flex={'auto'} style={{ marginLeft: 5 }}>
          <Input
            placeholder={'描述'}
            value={schemaDescription}
            onBlur={() => {
              if (changeSchema) {
                changeSchema(
                  namePath.concat(getPropertyIndex(schema, 'description')),
                  schemaDescription,
                  'description',
                );
              }
            }}
            onChange={(description) =>
              setSchemaDescription(description.target.value)
            }
          />
        </Col>
        <Col flex={'72px'} style={{ marginLeft: 5 }}>
          <Row style={{ width: '72px' }}>
            <Tooltip title={'高级设置'}>
              <Button
                type={'text'}
                size={'small'}
                icon={<SettingOutlined />}
                style={{ color: 'green' }}
                onClick={() => {
                  setFormSchema(schema);
                  setAdvancedModal(!advancedModal);
                }}
              />
            </Tooltip>
            {!isRoot && !isArrayItems || schema.type === 'object' ? (
              <Dropdown
                disabled={!addChildItems}
                placement="bottom"
                menu={{
                  items: [
                    {
                      key: 'addNode',
                      label: '同级节点',
                      onClick: () => {
                        if (addProperty) {
                          addProperty(namePath, false);
                        }
                      },
                    },
                    {
                      key: 'addChildNode',
                      label: '子级节点',
                      onClick: () => {
                        if (addProperty) {
                          addProperty(namePath, true);
                        }
                      },
                    },
                  ],
                }}
              >
                <Tooltip title={!addChildItems && '添加节点'}>
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<PlusOutlined />}
                    style={{ color: token.colorPrimary }}
                    onClick={() => {
                      if (addChildItems) {
                        return;
                      }
                      if (addProperty) {
                        addProperty(namePath, !(!isArrayItems && !isRoot));
                      }
                    }}
                  />
                </Tooltip>
              </Dropdown>
            ) : (
              <div style={{ width: '24px' }} />
            )}
            <Col flex={'24px'}>
              {isRoot ? (
                <Tooltip title={'导入Json'}>
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<ImportOutlined />}
                    style={{ color: 'purple' }}
                    onClick={() => setImportModal(true)}
                  />
                </Tooltip>
              ) : !isArrayItems ? (
                <Tooltip title={'删除节点'}>
                  <Button
                    danger
                    type={'text'}
                    size={'small'}
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      if (removeProperty) {
                        removeProperty(namePath);
                      }
                    }}
                  />
                </Tooltip>
              ) : (
                <div style={{ width: '24px' }} />
              )}
            </Col>
            {isRoot && schema.type !== 'object' && (
              <Col flex={'24px'}>
                {!isArrayItems && <div style={{ width: '24px' }} />}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      {schema.type === 'object' &&
        expand &&
        schema.properties &&
        Object.keys(schema.properties).map((name) => {
          if (schema.properties) {
            return (
              <div key={String(name)}>
                <SchemaItem
                  {...props}
                  isArrayItems={false}
                  nodeDepth={nodeDepth + 1}
                  parentSchemaDepth={!isRoot ? parentSchemaDepth + 2 : 0}
                  namePath={namePath.concat(
                    getPropertyIndex(schema, 'properties'),
                    getPropertyIndex(schema.properties, name),
                  )}
                  propertyName={name}
                  schema={schema.properties[name] as JSONSchema7}
                />
              </div>
            );
          }
          return <></>;
        })}
      {schema.type === 'array' && expand && (
        <SchemaItem
          {...props}
          isArrayItems={true}
          nodeDepth={nodeDepth + 1}
          parentSchemaDepth={!isRoot ? parentSchemaDepth + 1 : 0}
          propertyName={'items'}
          namePath={namePath.concat(getPropertyIndex(schema, 'items'))}
          schema={schema.items as JSONSchema7}
        />
      )}
      <Modal
        title="高级设置"
        width={900}
        open={advancedModal}
        okText={'保存'}
        cancelText={'取消'}
        onOk={() => {
          if (!changeSchema) {
            return;
          }
          if (isRoot || schema.type === 'object') {
            changeSchema(namePath, { ...schema, ...formSchema }, 'root');
            setAdvancedModal(!advancedModal);
            return;
          }
          advancedForm
            .validateFields()
            .then((values) => {
              changeSchema(namePath, { ...schema, ...values }, propertyName);
              setAdvancedModal(!advancedModal);
            })
            .catch((errorInfo) => {
              console.log('Failed:', errorInfo);
            });
        }}
        onCancel={() => setAdvancedModal(!advancedModal)}
      >
        <Form
          form={advancedForm}
          onValuesChange={(_, allValues) => {
            if (editorRef.current) {
              editorRef.current.setValue(
                JSON.stringify({ ...formSchema, ...allValues }, null, 2),
              );
            }
          }}
        >
          {!isObject && SchemaTypes.indexOf(formSchema?.type) !== -1 && (
            <div
              style={{
                borderLeft: `3px solid ${token.colorPrimary}`,
                fontSize: 16,
                fontWeight: 399,
                paddingLeft: 8,
                marginBottom: 13,
              }}
            >
              基本设置
            </div>
          )}
          {(isString || isNumber || isInteger || isBoolean) && (
            <Row
              justify={'start'}
              align={'middle'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                默认值：
              </Col>
              <Col span={8}>
                <Form.Item noStyle name={'default'}>
                  {isString && (
                    <Input
                      style={{ width: '100%' }}
                      placeholder={'请输入默认值'}
                    />
                  )}
                  {(isNumber || isInteger) && (
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder={'请输入默认值'}
                    />
                  )}
                  {isBoolean && (
                    <Select
                      style={{ width: '100%' }}
                      placeholder={'请选择默认值'}
                      options={[
                        { value: true, label: 'true' },
                        { value: false, label: 'false' },
                      ]}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          )}
          {isString && (
            <Row
              justify={'start'}
              align={'middle'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                最小长度：
              </Col>
              <Col span={8}>
                <Form.Item noStyle name={'minLength'}>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    parser={(value) =>
                      value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                    }
                    formatter={(value) =>
                      value ? `${Math.floor(Math.max(value, 0))}` : ''
                    }
                    placeholder={'请输入最小长度'}
                  />
                </Form.Item>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                最大长度：
              </Col>
              <Col span={8}>
                <Form.Item noStyle name={'maxLength'}>
                  <InputNumber
                    min={0}
                    style={{ width: '100%' }}
                    parser={(value) =>
                      value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                    }
                    formatter={(value) =>
                      value ? `${Math.floor(Math.max(value, 0))}` : ''
                    }
                    placeholder={'请输入最大长度'}
                  />
                </Form.Item>
              </Col>
            </Row>
          )}
          {(isNumber || isInteger) && (
            <>
              <Row
                justify={'start'}
                align={'middle'}
                style={{ marginBottom: 13 }}
              >
                <Col span={4} style={{ textAlign: 'right' }}>
                  最小值：
                </Col>
                <Col span={8}>
                  <Form.Item noStyle name={'minimum'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder={'请输入最小值'}
                    />
                  </Form.Item>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  最大值：
                </Col>
                <Col span={8}>
                  <Form.Item noStyle name={'maximum'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder={'请输入最大值'}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row
                justify={'start'}
                align={'middle'}
                style={{ marginBottom: 13 }}
              >
                <Col span={4} style={{ textAlign: 'right' }}>
                  排他最小值：
                </Col>
                <Col span={8}>
                  <Form.Item noStyle name={'exclusiveMinimum'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder={'请输入排他最小值'}
                    />
                  </Form.Item>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  排他最大值：
                </Col>
                <Col span={8}>
                  <Form.Item noStyle name={'exclusiveMaximum'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder={'请输入排他最大值'}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          {isString && (
            <>
              <Row
                justify={'start'}
                align={'middle'}
                style={{ marginBottom: 13 }}
              >
                <Col span={4} style={{ textAlign: 'right' }}>
                  正则匹配：
                </Col>
                <Col span={20}>
                  <Form.Item noStyle name={'pattern'}>
                    <Input placeholder={'请输入正则匹配公式'} />
                  </Form.Item>
                </Col>
              </Row>
              <Row
                justify={'start'}
                align={'middle'}
                style={{ marginBottom: 13 }}
              >
                <Col span={4} style={{ textAlign: 'right' }}>
                  格式：
                </Col>
                <Col span={8}>
                  <Form.Item noStyle name={'format'}>
                    <Select
                      allowClear
                      options={StringFormat}
                      placeholder={'请选择字符串格式'}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          {isArray && (
            <>
              <Row
                justify={'start'}
                align={'middle'}
                style={{ marginBottom: 13 }}
              >
                <Col span={4} style={{ textAlign: 'right' }}>
                  元素唯一：
                </Col>
                <Col span={20}>
                  <Form.Item
                    noStyle
                    name={'uniqueItems'}
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Row
                justify={'start'}
                align={'middle'}
                style={{ marginBottom: 13 }}
              >
                <Col span={4} style={{ textAlign: 'right' }}>
                  最少元素个数：
                </Col>
                <Col span={8}>
                  <Form.Item noStyle name={'minItems'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      parser={(value) =>
                        value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                      }
                      formatter={(value) =>
                        value ? `${Math.floor(Math.max(value, 0))}` : ''
                      }
                      placeholder={'请输入最少元素个数'}
                    />
                  </Form.Item>
                </Col>
                <Col span={4} style={{ textAlign: 'right' }}>
                  最多元素个数：
                </Col>
                <Col span={8}>
                  <Form.Item noStyle name={'maxItems'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      parser={(value) =>
                        value ? parseInt(value.replace(/\D/g, ''), 10) : ''
                      }
                      formatter={(value) =>
                        value ? `${Math.floor(Math.max(value, 0))}` : ''
                      }
                      placeholder={'请输入最多元素个数'}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          {(isString || isNumber || isInteger) && (
            <Row
              justify={'start'}
              align={'middle'}
              style={{ marginBottom: 13 }}
            >
              <Col span={4} style={{ textAlign: 'right' }}>
                枚举：
              </Col>
              <Col span={20}>
                <Form.List name="enums">
                  {(fields, { add, remove }) => (
                    <>
                      <Row>
                        {fields.map(({ key, name, ...restField }) => (
                          <Col span={12} key={key}>
                            <Row
                              justify={'start'}
                              align={'middle'}
                              style={{ marginBottom: 6 }}
                            >
                              <Col flex={'auto'}>
                                <Form.Item
                                  {...restField}
                                  noStyle
                                  name={[name]}
                                  rules={[{ required: true }]}
                                >
                                  {isString && (
                                    <Input placeholder="请输入枚举值" />
                                  )}
                                  {(isNumber || isInteger) && (
                                    <InputNumber
                                      style={{ width: '100%' }}
                                      placeholder="请输入枚举值"
                                    />
                                  )}
                                </Form.Item>
                              </Col>
                              <Col flex={'36px'} style={{ paddingLeft: 7 }}>
                                <DeleteOutlined onClick={() => remove(name)} />
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item noStyle>
                            <Button
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                            >
                              添加枚举值
                            </Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          )}
          <div
            style={{
              borderLeft: `3px solid ${token.colorPrimary}`,
              fontSize: 16,
              fontWeight: 399,
              paddingLeft: 8,
              marginBottom: 13,
            }}
          >
            Json Schema
          </div>
          <MonacoEditor
            height={300}
            language="json"
            value={JSON.stringify(formSchema, null, 2)}
            handleEditorDidMount={handleEditorDidMount}
            onChange={(value) => {
              handleDebounce(() => {
                if (value) {
                  try {
                    const editorSchema = JSON.parse(value);
                    setFormSchema(editorSchema);
                  } catch (e) {}
                }
              });
            }}
          />
        </Form>
      </Modal>

      <Modal
        title="导入"
        width={900}
        okText={'导入'}
        cancelText={'取消'}
        open={importModal}
        onOk={async () => {
          if (!importValue || importValue.length === 0) {
            messageApi.warning('请输入导入的 Json 数据');
            return;
          }
          const importObject = parseJsonStr(importValue);
          if (!importObject) {
            messageApi.error('导入的内容不是 Json 格式的数据');
            return;
          }
          let schema;
          switch (importType) {
            case 'json':
              schema = new Draft07().createSchemaOf(importObject);
              break;
            case 'json-schema':
              schema = await resolveJsonSchemaRef(importObject);
              break;
          }
          if (changeSchema) {
            changeSchema([], schema, 'root');
            setImportModal(!importModal);
            setImportValue(undefined);
          }
        }}
        onCancel={() => setImportModal(!importModal)}
      >
        <Row style={{ marginBottom: 16 }}>
          <Radio.Group
            value={importType}
            optionType="button"
            buttonStyle="solid"
            onChange={(type) => setImportType(type.target.value)}
            options={[
              { value: 'json', label: 'Json' },
              { value: 'json-schema', label: 'JsonSchema' },
            ]}
          />
        </Row>
        <Row>
          <MonacoEditor
            height={390}
            language="json"
            handleEditorDidMount={handleEditorDidMount}
            onChange={(value) => setImportValue(value)}
          />
        </Row>
      </Modal>
    </>
  );
}

export default SchemaItem;
