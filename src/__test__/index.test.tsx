import * as React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../tests/mountTest';
import TooltipButton from '../index';

mountTest(TooltipButton);

describe('TooltipButton', () => {
  it('render button count correctly', () => {
    const component = mount(<TooltipButton title="Title">Test</TooltipButton>);

    expect(component.find('button').text()).toBe('Test');
  });
});
