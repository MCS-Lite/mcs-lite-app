import React from 'react';
import { shallow } from 'enzyme';
import R from 'ramda';
import Notification from '../Notification';

it('should redner <Notification /> when it is on server-side', () => {
  const wrapper = shallow(
    <Notification getMessages={R.identity} />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('should redner <Notification /> when it is mobile mode', () => {
  const wrapper = shallow(
    <Notification getMessages={R.identity} />,
  );

  wrapper.setState({ show: true });

  expect(wrapper).toMatchSnapshot();
});

it('should handle onClose', () => {
  const wrapper = shallow(
    <Notification getMessages={R.identity} />,
  );

  // Before onClose
  wrapper.setState({ show: true });
  expect(wrapper.state('show')).toBe(true);

  // After onClose
  wrapper.instance().onClose();
  expect(wrapper.state('show')).toBe(false);
});
