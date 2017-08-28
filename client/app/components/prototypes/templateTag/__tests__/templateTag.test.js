import React from 'react';
import { shallow } from 'enzyme';
import R from 'ramda';
import TemplateTag from '../templateTag';

it('render', () => {
  const wrapper = shallow(<TemplateTag getMessages={R.identity} />);

  expect(wrapper).toMatchSnapshot();
});
