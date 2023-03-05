import { ReactElement, ReactNode } from 'react';
interface FieldInputProp {
    value: string;
    addonAfter?: ReactNode;
    onChange: (value: string) => boolean;
}
declare const FieldInput: (props: FieldInputProp) => ReactElement;
export default FieldInput;
