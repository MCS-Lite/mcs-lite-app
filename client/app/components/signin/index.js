import React, { Component } from 'react';

import LoginStyles from '../login/styles.css'
import styles from './styles.css'

import InputText from 'mtk-ui/lib/InputText';
import InputForm from 'mtk-ui/lib/InputForm';
import InputCheckbox from 'mtk-ui/lib/InputCheckbox';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import Footer from '../footer';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { browserHistory } from 'react-router';
import logo from '../login/logo.png';

import c from 'classnames';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

const Signin = ({
  signin,
  openLogin,
  getMessages: t,
}) => {
  return (
    <div>
      <div className={LoginStyles.base}>
        <form
          className={c(LoginStyles.form, styles.form)}
          id="signinSubmit"
          role="form"
          action={ window.oauthUrl + "/signin" }
          method="post"
        >
          <img src={logo} className={LoginStyles.logo}/>
          {signin.errorMsg}
          <Hr className={LoginStyles.hr}>{t('createAnAccount')}</Hr>
          <InputText name="userName" type="text" placeholder={t('nickname')} className={LoginStyles.input} />
          <InputText name="email" type="email" placeholder={t('Email')} className={LoginStyles.input} />
          <InputText name="password" type="password" placeholder={t('password')} className={LoginStyles.input} />
          <InputText name="passwordAgain" type="password" placeholder={t('passwordAgain')} className={LoginStyles.input} />
          <div className={styles.submit}>
            <Button kind="cancel" onClick={openLogin} className={styles.submitBtn}>
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
}

export default compose(
  pure,
  withState('isOpenTermOfUse', 'setIsOpenTermOfUse', false),
  withHandlers({
    openTermOfUse: props => () => props.setIsOpenTermOfUse(!props.isOpenTermOfUse),
    openLogin: props => () => browserHistory.push('/login'),
  }),
  withGetMessages(messages, 'Signin'),
)(Signin);