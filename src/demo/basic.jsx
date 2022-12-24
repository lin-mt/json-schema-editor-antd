import React, { useState } from 'react';
import JsonSchemaEditor from '@quiet-front-end/json-schema-editor-antd';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types,no-console */
// noinspection NpmUsedModulesInstalled

export default () => {
  const [val, setVal] = useState();

  function updateVal() {
    setVal(
      '{\n' +
        '  "type": "object",\n' +
        '  "properties": {\n' +
        '    "field_0": {\n' +
        '      "type": "string"\n' +
        '    },\n' +
        '    "field_1": {\n' +
        '      "type": "string"\n' +
        '    },\n' +
        '    "field_2": {\n' +
        '      "type": "string"\n' +
        '    }\n' +
        '  },\n' +
        '  "required": [\n' +
        '    "field_0",\n' +
        '    "field_1",\n' +
        '    "field_2"\n' +
        '  ]\n' +
        '}'
    );
  }

  return (
    <div style={{ width: '90%' }}>
      <button style={{ marginBottom: 20, cursor: 'pointer' }} onClick={updateVal}>
        update schema
      </button>
      <JsonSchemaEditor
        mock
        data={val}
        onChange={(value) => {
          setVal(value);
        }}
      />
    </div>
  );
};
