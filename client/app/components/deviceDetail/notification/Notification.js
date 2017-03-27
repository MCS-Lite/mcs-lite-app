import React, { PropTypes } from 'react';
import Transition from 'react-motion-ui-pack';
import { IconClose } from 'mcs-lite-icon';
import MobileDetect from 'mobile-detect';
import { P, Button, Notification as MLNotification } from 'mcs-lite-ui';
import { Fixed, RightWrapper, IconWrapper } from './styled-components';
import { switchToMobilePathname } from './utils';

const md = new MobileDetect(window.navigator.userAgent);

class Notification extends React.Component {
  static propTypes = {
    // React-intl i18n
    getMessages: PropTypes.func.isRequired,
  }
  state = { show: md.mobile() }
  onClose = () => this.setState({ show: false });
  onSwitch = () => {
    window.location.pathname = switchToMobilePathname(window.location.pathname);
  }
  render() {
    const { getMessages: t } = this.props;
    const { onClose, onSwitch } = this;

    return this.state.show && (
      <Fixed>
        <Transition
          component={false}
          appear={{ opacity: 0.5, translateY: -40 }}
          enter={{ opacity: 1, translateY: 0 }}
        >
          <MLNotification key="notification">
            <P>{t('switchQuestion')}</P>

            <RightWrapper>
              <Button onClick={onSwitch}>{t('switchToMobile')}</Button>
              <IconWrapper onClick={onClose}><IconClose /></IconWrapper>
            </RightWrapper>
          </MLNotification>
        </Transition>
      </Fixed>
    );
  }
}

export default Notification;
