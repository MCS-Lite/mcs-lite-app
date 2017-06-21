import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import Panel from 'mtk-ui/lib/Panel';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import A from 'mcs-lite-ui/lib/A';
import IconAccount from 'mcs-lite-icon/lib/IconAccount';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import ProfilePhoto from '../profilePhoto';

import styles from './styles.css';

const Column = ({ label, children }) => (
  <div className={styles.column}>
    <div>{label}</div>
    <div>{children}</div>
  </div>
);

const ProfilePanel = ({
  userName,
  email,
  onEditUserNameClick,
  onChangePasswordClick,
  userImage,
  uploadProfileImage,
  pushToast,
  language,
  getMessages: t,
}) => (
  <Panel className={styles.panel}>
    <PanelHeader>
      <PanelIcon icon={<IconAccount size={24} />} />
      <div className={styles.panelHeaderContent}>
        {t('profile')}
      </div>
    </PanelHeader>
    <PanelBody className={styles.panelBody}>
      <div>
        <ProfilePhoto
          userImage={userImage}
          uploadProfileImage={uploadProfileImage}
          pushToast={pushToast}
        />
      </div>
      <div>
        <Column
          label={t('userName')}
        >
          {userName}
          <A
            className={styles.editUserName}
            onClick={onEditUserNameClick}
          >
            {t('editUserName')}
          </A>
        </Column>
        <Column label="Email">{email}</Column>
        <Column
          label={t('password')}
        >
          <A onClick={onChangePasswordClick}>
            {t('editPassword')}
          </A>
        </Column>
        <Column
          label={t('language')}
        >
          {language}
        </Column>
      </div>
    </PanelBody>
  </Panel>
);

export default compose(
  pure,
  withHandlers({
    onEditUserNameClick: props => () => props.setDialogShow('editUserName'),
    onChangePasswordClick: props => () => props.setDialogShow('changePassword'),
  }),
  withGetMessages(messages, 'Profile'),
  withProps((language) => {
    switch(localStorage.getItem('locale')) {
      case 'en':
        language = 'English';
        break;
      case 'zh-TW':
        language = '繁體中文';
        break;
      case 'zh-CN':
        language = '简体中文';
        break;
    }
    return { language };
  }),
)(ProfilePanel);
