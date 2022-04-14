import React from 'react';
import { render } from 'enzyme';
import './mockDate';

function demoTest(Demos = []) {
  Demos.forEach((Demo, index) => {
    it(`renders demo/${index} correctly`, () => {
      const wrapper = render(<Demo />);
      expect(wrapper).toMatchSnapshot();
    });
  });
}

export default demoTest;
