import { Input, InputRef, message } from 'antd';
import _ from 'lodash';
import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';

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

  const handleChange = (value: any) => {
    if (value.length === 0) {
      message.warning('FieldName can not empty.').then();
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
    const current = ref.current;
    if (current !== null) {
      current.input?.addEventListener(
        'blur',
        _.debounce(() => {
          if (current.input?.value.length === 0) {
            message.warning('FieldName can not empty.').then();
            current.input.focus();
          }
        }, 50),
      );
    }
  }, []);

  return (
    <Input
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
