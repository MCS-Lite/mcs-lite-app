import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import { theme } from 'mcs-lite-theme';
import { CodeWrapper } from '../styled-components';

jest.mock('mcs-lite-ui');

it('should render components correctly', () => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <div>
        <CodeWrapper />
      </div>
    </ThemeProvider>,
  );

  expect(wrapper.find('div')).toMatchSnapshot();
});
