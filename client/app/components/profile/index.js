import React from 'react';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import withState from 'recompose/withState';

import Breadcrumb from 'mtk-ui/lib/Breadcrumb';

import Footer from '../footer';
import Header from '../header';
import ProfilePanel from './panel';
import EditUserNameDialog from './dialogs/editUserNameDialog';
import ChangePasswordDialog from './dialogs/changePasswordDialog';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

import styles from './styles.css';

const Profile = ({
  main = {},
  setDialogShow,
  dialogShow,
  editUserName,
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
      <Header
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'
      />
      <div className={styles.base}>
        <Breadcrumb items={breadcrumbs} />
        <ProfilePanel
          userName={main.userName}
          email={main.email}
          setDialogShow={setDialogShow}
        />
      </div>
      <Footer />
      {
        dialogShow === 'editUserName' &&
        <EditUserNameDialog
          userName={main.userName}
          setDialogShow={setDialogShow}
          editUserName={editUserName}
        />
      }
      { dialogShow === 'changePassword' && <ChangePasswordDialog setDialogShow={setDialogShow} />}
    </div>
  )
};

export default compose(
  pure,
  withState('dialogShow', 'setDialogShow', 'none'),
  withGetMessages(messages, 'Profile'),
)(Profile);
