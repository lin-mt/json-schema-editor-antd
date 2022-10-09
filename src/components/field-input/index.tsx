import React, { ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import { Input, InputRef, message } from 'antd';

interface FieldInputProp {
  value: string;
  addonAfter?: ReactNode;
  onChange: (value: string) => boolean;
}

const FieldInput = (props: FieldInputProp): ReactElement => {
  const [fieldValue, setFieldValue] = useState<string>(props.value);
  const [status, setStatus] = useState<'' | 'warning' | 'error'>('');
  const [placeholder, setPlaceholder] = useState<string>();
  const ref = useRef<InputRef>(null);

  useEffect(() => {
    setFieldValue(props.value);
  }, [props.value]);

  const handleChange = (value) => {
    if (value.length === 0) {
      message.warn('FieldName can not empty.').then();
      setStatus('error');
      setFieldValue((prevState) => {
        setPlaceholder(prevState);
        return value;
      });
      return;
    }
    setPlaceholder('');
    setStatus('');
    if (placeholder === value) {
      setFieldValue(value);
      return;
    }
    if (props.onChange(value) && value) {
      setFieldValue(value);
    }
  };

  useEffect(() => {
    ref.current.input.addEventListener('blur', () => {
      if (ref.current.input.value.length === 0) {
        message.warn('FieldName can not empty.').then();
        ref.current.input.focus();
      }
    });
  }, []);

  return (
    <Input
      autoFocus
      ref={ref}
      status={status}
      addonAfter={props.addonAfter}
      value={fieldValue}
      placeholder={placeholder}
      onChange={(ele) => handleChange(ele.target.value)}
    />
  );
};

export default FieldInput;
