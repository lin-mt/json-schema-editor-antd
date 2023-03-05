import { ReactElement } from 'react';
import Schema from '../../types/Schema';
declare type MockSelectProp = {
    schema?: Schema;
    showEdit: () => void;
    onChange: (value: string) => void;
};
declare const MockSelect: (props: MockSelectProp) => ReactElement;
export default MockSelect;
