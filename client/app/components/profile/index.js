import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

import Breadcrumb from 'mtk-ui/lib/Breadcrumb';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import ProfilePanel from './panel';
import EditUserNameDialog from './dialogs/editUserNameDialog';
import ChangePasswordDialog from './dialogs/changePasswordDialog';

import styles from './styles.css';

const Profile = ({
  main = {},
  setDialogShow,
  dialogShow,
  editUserName,
  changePassword,
  uploadProfileImage,
  pushToast,
  getMessages: t,
}) => {
  const breadcrumbs = [
    {
      children: t('profile'),
      href: '/profile',
    },
  ];

  return (
    <div>
      <div className={styles.base}>
        <Breadcrumb items={breadcrumbs} />
        <ProfilePanel
          userName={main.userName}
          email={main.email}
          userImage={main.userImage}
          setDialogShow={setDialogShow}
          uploadProfileImage={uploadProfileImage}
          pushToast={pushToast}
        />
      </div>
      {
        dialogShow === 'editUserName' &&
        <EditUserNameDialog
          userName={main.userName}
          setDialogShow={setDialogShow}
          editUserName={editUserName}
          pushToast={pushToast}
        />
      }
      {
        dialogShow === 'changePassword' &&
        <ChangePasswordDialog
          setDialogShow={setDialogShow}
          changePassword={changePassword}
          pushToast={pushToast}
        />
      }
    </div>
  );
};

export default compose(
  pure,
  withState('dialogShow', 'setDialogShow', 'none'),
  withGetMessages(messages, 'Profile'),
)(Profile);
