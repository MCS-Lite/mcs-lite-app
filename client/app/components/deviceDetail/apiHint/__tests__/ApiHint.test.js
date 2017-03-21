import React from 'react';
import { shallow } from 'enzyme';
import R from 'ramda';
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

it('should handle tab click', (done) => {
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

  const arduinoTab = wrapper.find(TabItem).at(1);
  // After clicking
  arduinoTab.simulate('click');
  setTimeout(() => {
    expect(wrapper.find(Code).props()).toMatchSnapshot();
    done();
  }, 100);
});
