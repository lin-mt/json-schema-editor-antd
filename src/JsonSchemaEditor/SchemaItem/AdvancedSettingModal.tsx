import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Switch,
  theme,
} from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import MonacoEditor from '../MonacoEditor';
import { SchemaTypes, StringFormat } from '../utils';

interface AdvancedSettingModalProps {
  schema: any;
  open?: boolean;
  onOk?: (newSchema: any) => void;
  onCancel?: () => void;
}

export default (props: AdvancedSettingModalProps) => {
  const { schema, open = false, onOk, onCancel } = props;

  const { token } = theme.useToken();
  const [advancedForm] = Form.useForm();
  const [formSchema, setFormSchema] = useState<any>();
  const [advancedModal, setAdvancedModal] = useState(false);
  const [isObject, setIsObject] = useState(false);
  const [isArray, setIsArray] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isBoolean, setIsBoolean] = useState(false);
  const [isInteger, setIsInteger] = useState(false);
  const [isString, setIsString] = useState(false);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setFormSchema(schema);
  }, [schema]);

  useEffect(() => {
    setAdvancedModal(open);
  }, [open]);

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
    editorRef.current.setValue(JSON.stringify(schema, null, 2));
  }

  function onClose() {
    if (onCancel) {
      onCancel();
    }
    setAdvancedModal(false);
  }

  return (
    <Modal
      title="高级设置2"
      width={900}
      open={advancedModal}
      onOk={() => {
        advancedForm
          .validateFields()
          .then((values) => onOk && onOk({ ...formSchema, ...values }))
          .catch((errorInfo) => {
            console.log('Failed:', errorInfo);
          })
          .finally(() => onClose());
      }}
      onCancel={onClose}
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
          <Row justify={'start'} align={'middle'} style={{ marginBottom: 13 }}>
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
          <Row justify={'start'} align={'middle'} style={{ marginBottom: 13 }}>
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
                <Form.Item noStyle name={'uniqueItems'} valuePropName="checked">
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
          <Row justify={'start'} align={'middle'} style={{ marginBottom: 13 }}>
            <Col span={4} style={{ textAlign: 'right' }}>
              枚举：
            </Col>
            <Col span={20}>
              <Form.List name="enums">
                {(fields, { add, remove }) => (
                  <>
                    <Row gutter={6}>
                      {fields.map(({ key, name, ...restField }) => (
                        <Col span={12} key={key}>
                          <Row
                            gutter={2}
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
                            <Col flex={'24px'}>
                              <Button
                                icon={<DeleteOutlined />}
                                size={'small'}
                                type={'text'}
                                danger={true}
                                onClick={() => remove(name)}
                              />
                            </Col>
                          </Row>
                        </Col>
                      ))}
                    </Row>
                    <Row>
                      <Col span={6}>
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
  );
};
