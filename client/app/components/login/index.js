import React from 'react';
import { Link } from 'react-router';
import { compose, pure, withState, withHandlers } from 'recompose';

import InputText from 'mtk-ui/lib/InputText';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import { Small } from 'mcs-lite-ui';
import logo from 'images/logo_mcs_lite_black.svg';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import Footer from '../footer';
import IconPublic from 'mcs-lite-icon/lib/IconPublic';
import IconFold from 'mcs-lite-icon/lib/IconFold';
import WithDropdownMenu from '../common/withDropdownMenu';
import c from 'classnames';

import styles from './styles.css';

const dropdownItems = [ 
  { value: 'en', children: 'English' },
  { value: 'zh-TW', children: '繁體中文' },
  { value: 'zh-CN', children: '简体中文' },
];

const Login = ({
  login,
  isDropdownOpen,
  onMenuChange,
  onMenuShowChange,
  getMessages: t,
}) => (
  <div>
    <div className={styles.changeLanguage}>
      <WithDropdownMenu
        dropdownItems={dropdownItems}
        onChange={onMenuChange}
        onMenuShowChange={onMenuShowChange}
        menuClassName={styles.menu}
      >
        <Button>
          <IconPublic className={styles.prefixIcon} />
          <div
            className={c(
              styles.dropdownButtonContent,
              isDropdownOpen && styles.dropdownOpen,
            )}
          >
            {t('changeLanguage')}
            <IconFold size={18} />
          </div>
        </Button>
      </WithDropdownMenu>
    </div>
    <div className={styles.base}>
      <form
        className={styles.form}
        id="loginSubmit"
        role="form"
        action={`${window.oauthUrl}/login`}
        method="post"
      >
        <img src={logo} className={styles.logo} alt="logo" />
        <div className={styles.errorMsg}>
          {login.errorMsg}
        </div>
        <Hr className={styles.hr}>
          <Small>{t('welcome')}</Small>
        </Hr>
        <InputText
          name="email"
          type="email"
          placeholder={t('Email')}
          className={styles.input}
        />
        <InputText
          name="password"
          type="password"
          placeholder={t('password')}
        />
        <div className={styles.createaccount}>
          {t('doNotHaveAccount')}
          <Link to="/signup">
            {t('createAnAccount')}
          </Link>
        </div>
        <Button type="submit" className={styles.submit}>
          {t('signIn')}
        </Button>
      </form>
    </div>
    <Footer />
  </div>
);

export default compose(
  pure,
  withState('isDropdownOpen', 'setIsDropdownOpen', false),
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withGetMessages(messages, 'Login'),
  withHandlers({
    onMenuChange: props => value => {
      window.location.href = window.location.origin + window.location.pathname + '?locale=' + value;  
      props.setSelectMenuValue(value);
    },
    onMenuShowChange: props => value => props.setIsDropdownOpen(value),
  }),
)(Login);
