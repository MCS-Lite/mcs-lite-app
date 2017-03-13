import React from 'react';
import { Link } from 'react-router';
import { compose, pure } from 'recompose';

import InputText from 'mtk-ui/lib/InputText';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import { Small } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import Footer from '../footer';
import logo from './logo.png';

import styles from './styles.css';

const Login = ({
  login,
  getMessages: t,
}) => (
  <div>
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
  withGetMessages(messages, 'Login'),
)(Login);
