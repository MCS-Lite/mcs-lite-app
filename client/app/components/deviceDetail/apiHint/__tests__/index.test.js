import React from 'react';
import { shallow } from 'enzyme';
import { IntlProvider } from 'react-intl';
import Container from '../';

it('should render Container correctly with HOC', () => {
  const wrapper = shallow(
    <IntlProvider locale="en">
      <Container />
    </IntlProvider>,
  );

  expect(wrapper).toMatchSnapshot();
});
