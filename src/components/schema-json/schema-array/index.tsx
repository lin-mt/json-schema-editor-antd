import React, { CSSProperties, ReactElement, useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import {
  CaretDownOutlined,
  CaretRightOutlined,
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Checkbox, Col, Input, Row, Select, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import { SchemaMobxContext } from '../../..';
import { EditorContext } from '../../editor';
import { JSONPATH_JOIN_CHAR, SCHEMA_TYPE } from '../../../constants';
import MockSelect from '../../mock-select';
import { mapping } from '../index';
import Schema from '../../../types/Schema';

interface SchemaArrayProp {
  data: Schema;
  prefix: string[];
  showEdit: (
    editorName: string[],
    prefix: string,
    propertyElement: string | { mock: string },
    type?: string
  ) => void;
  showAdv: (prefix: string[], property: Schema) => void;
}

const SchemaArray = observer((props: SchemaArrayProp): ReactElement => {
  const { data, prefix, showAdv, showEdit } = props;

  // noinspection DuplicatedCode
  const [tagPaddingLeftStyle, setTagPaddingLeftStyle] = useState<CSSProperties>({});

  const context = useContext(EditorContext);
  const mobxContext = useContext(SchemaMobxContext);

  useEffect(() => {
    const length = props.prefix.filter((name) => name !== 'properties').length;
    setTagPaddingLeftStyle({
      paddingLeft: `${20 * (length + 1)}px`,
    });
  }, [props.prefix]);

  const getPrefix = () => {
    return [].concat(prefix, 'items');
  };

  // 修改数据类型
  const handleChangeType = (value: string) => {
    const keys = getPrefix().concat('type');
    mobxContext.changeType({ keys, value });
  };

  // 修改备注信息
  const handleChangeDesc = (value) => {
    const key = getPrefix().concat(`description`);
    mobxContext.changeValue({ keys: key, value });
  };

  // 修改mock信息
  const handleChangeMock = (e: string) => {
    const key = getPrefix().concat('mock');
    const value = e ? { mock: e } : '';
    mobxContext.changeValue({ keys: key, value });
  };

  const handleChangeTitle = (value) => {
    const key = getPrefix().concat('title');
    mobxContext.changeValue({ keys: key, value });
  };

  // 增加子节点
  const handleAddChildField = () => {
    const keyArr = getPrefix().concat('properties');
    mobxContext.addChildField({ keys: keyArr });
    mobxContext.setOpenValue({ key: keyArr, value: true });
  };

  const handleClickIcon = () => {
    // 数据存储在 properties.name.properties下
    const keyArr = getPrefix().concat('properties');
    mobxContext.setOpenValue({ key: keyArr });
  };

  const handleShowEdit = (name: string, type?: string) => {
    showEdit(getPrefix(), name, data.items[name], type);
  };

  const handleShowAdv = () => {
    showAdv(getPrefix(), data.items);
  };

  const items = data.items;
  const prefixArray = [].concat(prefix, 'items');

  const prefixArrayStr = [].concat(prefixArray, 'properties').join(JSONPATH_JOIN_CHAR);

  return data.items !== undefined ? (
    <div>
      <Row gutter={11} justify="space-around" align="middle">
        <Col flex="auto">
          <Row gutter={11} justify="space-around" align="middle">
            <Col span={8} style={tagPaddingLeftStyle}>
              <Row justify="space-around" align="middle" className="field-name">
                <Col flex="20px">
                  {items.type === 'object' ? (
                    <span className="show-hide-children" onClick={handleClickIcon}>
                      {_.get(mobxContext.open, [prefixArrayStr]) ? (
                        <CaretDownOutlined />
                      ) : (
                        <CaretRightOutlined />
                      )}
                    </span>
                  ) : null}
                </Col>
                <Col flex="auto">
                  <Input
                    addonAfter={<Checkbox style={{ paddingLeft: 0 }} disabled />}
                    disabled
                    value="Items"
                  />
                </Col>
              </Row>
            </Col>
            <Col span={context.mock ? 3 : 4}>
              <Select style={{ width: '100%' }} onChange={handleChangeType} value={items.type}>
                {SCHEMA_TYPE.map((item, index) => {
                  return (
                    <Select.Option value={item} key={index}>
                      {item}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
            {context.mock && (
              <Col span={3}>
                <MockSelect
                  schema={items}
                  showEdit={() => handleShowEdit('mock', items.type)}
                  onChange={handleChangeMock}
                />
              </Col>
            )}
            <Col span={context.mock ? 5 : 6}>
              <Input
                addonAfter={
                  <EditOutlined
                    className="input_icon_editor"
                    onClick={() => handleShowEdit('title')}
                  />
                }
                placeholder="title"
                value={items.title}
                onChange={(event) => handleChangeTitle(event.target.value)}
              />
            </Col>
            <Col span={context.mock ? 5 : 6}>
              <Input
                addonAfter={
                  <EditOutlined
                    className="input_icon_editor"
                    onClick={() => handleShowEdit('description')}
                  />
                }
                placeholder="description"
                value={items.description}
                onChange={(event) => handleChangeDesc(event.target.value)}
              />
            </Col>
          </Row>
        </Col>
        <Col flex="66px">
          <Row gutter={8}>
            <Col span={8}>
              <span className="adv-set" onClick={handleShowAdv}>
                <Tooltip placement="top" title="adv_setting">
                  <SettingOutlined />
                </Tooltip>
              </span>
            </Col>
            <Col span={8}>
              {items.type === 'object' ? (
                <span className="plus" onClick={handleAddChildField}>
                  <Tooltip placement="top" title="add_child_node">
                    <PlusOutlined />
                  </Tooltip>
                </span>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <div style={{ paddingTop: 8 }}>{mapping(prefixArray, items, showEdit, showAdv)}</div>
    </div>
  ) : (
    <></>
  );
});

export default SchemaArray;
