import React from 'react';
import { browserHistory } from 'react-router';
import { compose, pure, withState, withHandlers } from 'recompose';
import InputText from 'mtk-ui/lib/InputText';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import { Small } from 'mcs-lite-ui';
import logo from 'images/logo_mcs_lite_black.svg';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import Footer from '../footer';

import LoginStyles from '../login/styles.css';
import styles from './styles.css';

const onCancel = () => browserHistory.push('/login');

const Signup = ({
  signup,
  onKeyDown,
  getMessages: t,
}) => (
  <div>
    <div className={LoginStyles.base}>
      <form
        className={styles.form}
        id="signupSubmit"
        role="form"
        action={`${window.oauthUrl}/signup`}
        method="post"
        onKeyDown={onKeyDown}
      >
        <img src={logo} className={LoginStyles.logo} alt="logo" />
        <div className={LoginStyles.errorMsg}>
          {signup.errorMsg}
        </div>
        <Hr className={LoginStyles.hr}>
          <Small>{t('createAnAccount')}</Small>
        </Hr>
        <InputText name="userName" type="text" placeholder={t('nickname')} className={LoginStyles.input} />
        <InputText name="email" type="email" placeholder={t('Email')} className={LoginStyles.input} />
        <InputText name="password" type="password" placeholder={t('password')} className={LoginStyles.input} />
        <InputText name="passwordAgain" type="password" placeholder={t('passwordAgain')} className={LoginStyles.input} />
        <div className={styles.submit}>
          <Button kind="cancel" onClick={onCancel} className={styles.submitBtn}>
            {t('cancel')}
          </Button>
          <Button type="submit" className={styles.submitBtn}>
            {t('submit')}
          </Button>
        </div>
      </form>
    </div>
    <Footer />
  </div>
);

export default compose(
  pure,
  withState('isOpenTermOfUse', 'setIsOpenTermOfUse', false),
  withHandlers({
    openTermOfUse: props => () => props.setIsOpenTermOfUse(!props.isOpenTermOfUse),
    onKeyDown: props => (e) => {
      if (e.key === 'Enter') return e.preventDefault();
    },
  }),
  withGetMessages(messages, 'Signup'),
)(Signup);
