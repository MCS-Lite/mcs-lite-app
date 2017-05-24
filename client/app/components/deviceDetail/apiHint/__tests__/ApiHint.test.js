import React from 'react';
import { shallow, mount } from 'enzyme';
import R from 'ramda';
import { ThemeProvider } from 'styled-components';
import { theme } from 'mcs-lite-theme';
import { Code, TabItem } from 'mcs-lite-ui';
import ApiHint from '../ApiHint';

jest.mock('../fetch', () => () => new Promise(resolve => resolve('Fake Code')));

it('should redner <ApiHint />', () => {
  const wrapper = shallow(
    <ApiHint
      deviceId="deviceId"
      deviceKey="deviceKey"
      datachannels={[
        { datachannelId: 'datachannelId', datachannelName: 'datachannelName' },
      ]}
      getMessages={R.identity}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

it('should handle tab clicking', done => {
  const wrapper = mount(
    <ThemeProvider theme={theme}>
      <ApiHint
        deviceId="deviceId"
        deviceKey="deviceKey"
        datachannels={[
          {
            datachannelId: 'datachannelId',
            datachannelName: 'datachannelName',
          },
        ]}
        getMessages={R.identity}
      />
    </ThemeProvider>,
  );

  const arduinoTab = wrapper.find(TabItem).at(1);

  // After clicking
  arduinoTab.simulate('click');
  setTimeout(() => {
    expect(wrapper.find(Code).props()).toMatchSnapshot();
    done();
  }, 500);
});
