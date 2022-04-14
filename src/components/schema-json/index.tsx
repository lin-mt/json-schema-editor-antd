import React, { ReactElement, useContext } from 'react';
import { observer } from 'mobx-react';
import SchemaArray from './schema-array';
import SchemaObject from './schema-object';
import { SchemaMobxContext } from '../../index';
import Schema from '../../types/Schema';

export const mapping = (
  name: string[],
  data: Schema,
  showEdit: (
    prefix: string[],
    editorName: string,
    propertyElement: string | { mock: string },
    type?: string
  ) => void,
  showAdv: (prefix: string[], property: Schema) => void
): ReactElement => {
  switch (data.type) {
    case 'array':
      return <SchemaArray prefix={name} data={data} showEdit={showEdit} showAdv={showAdv} />;
    case 'object':
      const nameArray = [].concat(name, 'properties');
      return <SchemaObject prefix={nameArray} data={data} showEdit={showEdit} showAdv={showAdv} />;
    default:
      return null;
  }
};

interface SchemaJsonProp {
  showEdit: (
    prefix: string[],
    editorName: string,
    propertyElement: string | { mock: string },
    type?: string
  ) => void;
  showAdv: (prefix: string[], property: Schema) => void;
}

const SchemaJson = observer((props: SchemaJsonProp): ReactElement => {
  const { showAdv, showEdit } = props;
  const mobxContext = useContext(SchemaMobxContext);

  return <div style={{ paddingTop: 8 }}>{mapping([], mobxContext.schema, showEdit, showAdv)}</div>;
});

export default SchemaJson;
