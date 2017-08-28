import React from 'react';
import { shallow } from 'enzyme';
import R from 'ramda';
import MethodSelector from '../methodSelector';

it('redner <MethodSelector /> with no options', () => {
  const wrapper = shallow(
    <MethodSelector getMessages={R.identity} />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('redner <MethodSelector /> with options', () => {
  const options = [
    { value: 'option1', children: 'option1' },
    { value: 'option2', children: 'option2' },
    { value: 'option3', children: 'option3' },
  ];

  const wrapper = shallow(
    <MethodSelector
      getMessages={R.identity}
      options={options}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
