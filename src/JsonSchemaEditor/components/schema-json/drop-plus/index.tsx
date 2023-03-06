import { PlusOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import { observer } from 'mobx-react';
import React, { ReactElement, useContext } from 'react';
import { SchemaMobxContext } from '../../..';

interface DropPlusProp {
  prefix: string[];
  name: string;
}

const DropPlus = observer((props: DropPlusProp): ReactElement => {
  const { prefix, name } = props;

  const context = useContext(SchemaMobxContext);

  return (
    <Tooltip placement="top" title="add_node">
      <Dropdown
        menu={{
          items: [
            {
              label: (
                <span
                  onClick={() => {
                    context.addField({ keys: prefix, name });
                  }}
                >
                  sibling_node
                </span>
              ),
              key: 'sibling_node',
            },
            {
              label: (
                <span
                  onClick={() => {
                    context.setOpenValue({
                      key: prefix.concat(name, 'properties'),
                      value: true,
                    });
                    context.addChildField({
                      keys: prefix.concat(name, 'properties'),
                    });
                  }}
                >
                  child_node
                </span>
              ),
              key: 'child_node',
            },
          ],
        }}
      >
        <PlusOutlined style={{ color: '#2395f1' }} />
      </Dropdown>
    </Tooltip>
  );
});

export default DropPlus;
