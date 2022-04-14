import React, { useState } from 'react';
import JsonSchemaEditor from '@quiet-front-end/json-schema-editor-antd';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types,no-console */
// noinspection NpmUsedModulesInstalled

export default () => {
  const [val, setVal] = useState();

  console.log(val, 'val');

  return (
    <div>
      <JsonSchemaEditor
        mock
        onChange={(value) => {
          setVal(value);
        }}
      />
    </div>
  );
};
