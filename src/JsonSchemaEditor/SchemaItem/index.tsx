import {
  CaretDownOutlined,
  CaretRightOutlined,
  DeleteOutlined,
  ImportOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AdvancedSettingModal from '@quiet-front-end/json-schema-editor-antd/JsonSchemaEditor/SchemaItem/AdvancedSettingModal';
import ImportModal from '@quiet-front-end/json-schema-editor-antd/JsonSchemaEditor/SchemaItem/ImportModal';
import {
  Button,
  Checkbox,
  Col,
  Dropdown,
  Input,
  message,
  Row,
  Select,
  theme,
  Tooltip,
} from 'antd';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { JSONSchema7 } from '../types';
import {
  getDefaultSchema,
  getPropertyIndex,
  SchemaTypeOptions,
} from '../utils';

type SchemaItemProps = {
  propertyName?: string;
  nodeDepth?: number;
  parentSchemaDepth?: number;
  namePath?: number[];
  isArrayItems?: boolean;
  isRequire?: boolean;
  schema: JSONSchema7;
  changeSchema?: (
    namePath: number[],
    value: any,
    propertyName?: string,
  ) => void;
  renameProperty?: (namePath: number[], name: string) => void;
  removeProperty?: (namePath: number[]) => void;
  addProperty?: (path: number[], isChild: boolean) => void;
  updateRequiredProperty?: (
    path: number[],
    requiredProperty: string,
    removed: boolean,
  ) => void;
  handleAdvancedSettingClick?: (
    namePath: number[],
    schema: JSONSchema7,
    propertyName?: string,
  ) => boolean;
};

function SchemaItem(props: SchemaItemProps) {
  const { token } = theme.useToken();
  const { t } = useI18n();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    changeSchema,
    renameProperty,
    isArrayItems,
    updateRequiredProperty,
    parentSchemaDepth = 0,
    removeProperty,
    addProperty,
    isRequire,
    handleAdvancedSettingClick,
  } = props;

  const [schema, setSchema] = useState(props.schema);
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
            placeholder={t('PropertyPlaceholder')}
            onBlur={() => {
              if (propertyName?.length === 0) {
                messageApi.warning(t('PropertyNameEmptyWarnMsg')).then();
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
            checked={isRequire}
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
            placeholder={t('TitlePlaceholder')}
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
            placeholder={t('DescriptionPlaceholder')}
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
            <Tooltip title={t('AdvancedSettings')}>
              <Button
                type={'text'}
                size={'small'}
                icon={<SettingOutlined />}
                style={{ color: 'green' }}
                onClick={() => {
                  if (
                    handleAdvancedSettingClick &&
                    !handleAdvancedSettingClick(
                      namePath,
                      schema,
                      isRoot || schema.type === 'object'
                        ? undefined
                        : propertyName,
                    )
                  ) {
                    return;
                  }
                  setAdvancedModal(!advancedModal);
                }}
              />
            </Tooltip>
            {(!isRoot && !isArrayItems) || schema.type === 'object' ? (
              <Dropdown
                disabled={!addChildItems}
                placement="bottom"
                menu={{
                  items: [
                    {
                      key: 'addNode',
                      label: t('SiblingNodes'),
                      onClick: () => {
                        if (addProperty) {
                          addProperty(namePath, false);
                        }
                      },
                    },
                    {
                      key: 'addChildNode',
                      label: t('ChildNodes'),
                      onClick: () => {
                        if (addProperty) {
                          addProperty(namePath, true);
                        }
                      },
                    },
                  ],
                }}
              >
                <Tooltip title={!addChildItems && t('AddNode')}>
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
                <Tooltip title={t('ImportJson')}>
                  <Button
                    type={'text'}
                    size={'small'}
                    icon={<ImportOutlined />}
                    style={{ color: 'purple' }}
                    onClick={() => setImportModal(true)}
                  />
                </Tooltip>
              ) : !isArrayItems ? (
                <Tooltip title={t('DeleteNode')}>
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
                  isRequire={schema.required?.includes(name)}
                  isArrayItems={false}
                  nodeDepth={nodeDepth + 1}
                  parentSchemaDepth={!isRoot ? parentSchemaDepth + 2 : 0}
                  namePath={namePath.concat(
                    getPropertyIndex(schema, 'properties'),
                    getPropertyIndex(schema.properties, name),
                  )}
                  propertyName={name}
                  schema={schema.properties[name] as JSONSchema7}
                  handleAdvancedSettingClick={handleAdvancedSettingClick}
                />
              </div>
            );
          }
          return <></>;
        })}
      {schema.type === 'array' && expand && (
        <SchemaItem
          {...props}
          isRequire={false}
          isArrayItems={true}
          nodeDepth={nodeDepth + 1}
          parentSchemaDepth={!isRoot ? parentSchemaDepth + 1 : 0}
          propertyName={'items'}
          namePath={namePath.concat(getPropertyIndex(schema, 'items'))}
          schema={schema.items as JSONSchema7}
          handleAdvancedSettingClick={handleAdvancedSettingClick}
        />
      )}

      <AdvancedSettingModal
        schema={schema}
        open={advancedModal}
        onOk={(newSchema) => {
          if (!changeSchema) {
            return;
          }
          if (isRoot || schema.type === 'object') {
            changeSchema(namePath, { ...newSchema });
            setAdvancedModal(false);
            return;
          }
          changeSchema(namePath, { ...newSchema }, propertyName);
          setAdvancedModal(false);
        }}
        onCancel={() => setAdvancedModal(false)}
      />

      <ImportModal
        open={importModal}
        onOk={(newSchema) => {
          if (changeSchema) {
            changeSchema([], newSchema);
            setImportModal(false);
          }
        }}
        onCancel={() => setImportModal(false)}
      />
    </>
  );
}

export default SchemaItem;
