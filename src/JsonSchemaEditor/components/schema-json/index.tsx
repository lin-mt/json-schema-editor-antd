import { observer } from 'mobx-react';
import React, { ReactElement, useContext } from 'react';
import { SchemaMobxContext } from '../../index';
import Schema from '../../types/Schema';
import SchemaArray from './schema-array';
import SchemaObject from './schema-object';

export const mapping = (
  name: string[],
  data: Schema | undefined,
  showEdit: (
    prefix: string[],
    editorName: string,
    propertyElement: string | { mock: string },
    type?: string,
  ) => void,
  showAdv: (prefix: string[], property?: Schema) => void,
): React.ReactElement | null => {
  const nameArray = [...name].concat('properties');
  switch (data?.type) {
    case 'array':
      return (
        <SchemaArray
          prefix={name}
          data={data}
          showEdit={showEdit}
          showAdv={showAdv}
        />
      );
    case 'object':
      return (
        <SchemaObject
          prefix={nameArray}
          data={data}
          showEdit={showEdit}
          showAdv={showAdv}
        />
      );
    default:
      return null;
  }
};

interface SchemaJsonProp {
  showEdit: (
    prefix: string[],
    editorName: string,
    propertyElement: string | { mock: string },
    type?: string,
  ) => void;
  showAdv: (prefix: string[], property?: Schema) => void;
}

const SchemaJson = observer((props: SchemaJsonProp): ReactElement => {
  const { showAdv, showEdit } = props;
  const mobxContext = useContext(SchemaMobxContext);

  return (
    <div style={{ paddingTop: 8 }}>
      {mapping([], mobxContext.schema, showEdit, showAdv)}
    </div>
  );
});

export default SchemaJson;
