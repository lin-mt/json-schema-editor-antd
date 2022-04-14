import React, { ReactElement } from 'react';
import SchemaItem from '../schema-item';
import Schema from '../../../types/Schema';

interface SchemaObjectProp {
  data: Schema;
  prefix: string[];
  showEdit: (
    prefix: string[],
    editorName: string,
    propertyElement: string | { mock: string },
    type?: string
  ) => void;
  showAdv: (prefix: string[], property: Schema) => void;
}

const SchemaObject = (props: SchemaObjectProp): ReactElement => {
  const { data, prefix, showEdit, showAdv } = props;
  return (
    <div>
      {Object.keys(data.properties).map((name, index) => {
        return (
          <SchemaItem
            key={index}
            data={data}
            name={name}
            prefix={prefix}
            showEdit={showEdit}
            showAdv={showAdv}
          />
        );
      })}
    </div>
  );
};

export default SchemaObject;
