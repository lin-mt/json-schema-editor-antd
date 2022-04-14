import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Input, message } from 'antd';

interface FieldInputProp {
  value: string;
  addonAfter?: ReactNode;
  onChange: (value: string) => boolean;
}

const FieldInput = (props: FieldInputProp): ReactElement => {
  const [fieldValue, setFieldValue] = useState<string>(props.value);

  useEffect(() => {
    setFieldValue(props.value);
  }, [props.value]);

  const handleChange = (value) => {
    if (value.length === 0) {
      message.warn('FieldName can not empty.').then();
      return;
    }
    if (props.onChange(value) && value) {
      setFieldValue(value);
    }
  };

  return (
    <Input
      addonAfter={props.addonAfter}
      value={fieldValue}
      onChange={(ele) => handleChange(ele.target.value)}
    />
  );
};

export default FieldInput;
