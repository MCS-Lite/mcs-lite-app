import React from 'react';
import * as R from 'ramda';
import c from 'classnames';
import { browserHistory } from 'react-router';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import MiDevelopment from 'mtk-icon/lib/MiDevelopment';
import Avatar from 'mtk-ui/lib/Avatar';
import IconResources from 'mcs-lite-icon/lib/IconResources';
import IconPublic from 'mcs-lite-icon/lib/IconPublic';
import logo from 'images/logo_mcs_lite_white.svg';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import Nav from './nav';
import NavItem from './navItem';
import DropdownButton from './dropDownButton';

import resourcesConfig from './configs/resources';

import headerStyles from './header.css';

const isMenuActive = (listName, pathname) => {
  switch (listName) {
    case 'prototypesList':
      return (/prototypes/.test(pathname));
    case 'devicesList':
      return (/devices/.test(pathname));
    case 'helpList':
    default:
      return (/resources/.test(pathname));
  }
};

const isItemActive = (regPath, pathname) => new RegExp(regPath).test(pathname);
const getLocale = R.pipe(
  R.path(['location', 'search']),
  R.match(/^\?locale=(.*)/),
  R.nth(1),
);

const Header = ({
  basePath,
  imageUrl,
  pathname,
  onSignOut,
  getMessages: t,
}) => {
  const locale = getLocale(window);
  const resourcesList = [
    {
      name: t('intromcslite'),
      path: `./docs/${locale}/index.html`,
    },
    {
      name: t('tutorial'),
      path: `./docs/${locale}/mcs_lite_tutorial/7697_overview.html`,
    }
  ];

  return (
    <header className={headerStyles.base}>
      <div className={headerStyles.mask} />
      <div className={headerStyles.container}>
        <Nav>
          <NavItem
            to="/dashboard"
            linkStyle={headerStyles.logoLink}
          >
            <img
              src={logo}
              alt="logo"
              className={headerStyles.logo}
            />
          </NavItem>
        </Nav>
        <Nav>
          <DropdownButton
            buttonStyle={c(
              headerStyles.link,
              isMenuActive('developmentList', pathname) && headerStyles.activeStyle)}
            activeStyle={headerStyles.activeStyle}
            title={
              <span>
                <MiDevelopment className={headerStyles.prefixIcon} />
                {t('development')}
              </span>
            }
          >
            <NavItem
              to="/prototypes"
              className={c(
                headerStyles.menuItem,
                isItemActive('prototypes', pathname) ? headerStyles.menuItemActive : {},
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              {t('prototype')}
            </NavItem>
            <NavItem
              to="/devices"
              className={c(
                headerStyles.menuItem,
                isItemActive('devices', pathname) ? headerStyles.menuItemActive : {},
                headerStyles.menuItemBorder,
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              {t('devices')}
            </NavItem>
          </DropdownButton>
          <DropdownButton
            id="resources"
            buttonStyle={c(
              headerStyles.link,
              isMenuActive('resourcesList', pathname) && headerStyles.activeStyle,
            )}
            activeStyle={headerStyles.activeStyle}
            title={
              <span>
                <IconResources className={headerStyles.prefixIcon} />
                {t('resources')}
              </span>
            }
          >
            {
              resourcesList.map((entry, index, array) => (
                <NavItem
                  key={`nav-${entry.path}`}
                  to={entry.path.startsWith('http') ? entry.path : basePath + entry.path}
                  className={c(
                    headerStyles.menuItem,
                    isItemActive(entry.path, pathname) ? headerStyles.menuItemActive : {},
                    array.length === index + 1 ? headerStyles.menuItemBorder : {},
                  )}
                  isHref
                  linkStyle={headerStyles.menuLink}
                  activeStyle={c(
                    headerStyles.menuItemActive,
                    array.length === index + 1 ? headerStyles.menuItemBorder : {},
                  )}
                >
                  { entry.name }
                </NavItem>
              ))
            }
          </DropdownButton>
        </Nav>
        <Nav className={headerStyles.optionalBlock}>
          <DropdownButton
            id="profile"
            buttonStyle={headerStyles.link}
            activeStyle={headerStyles.activeStyle}
            title={
              <span>
                <Avatar
                  size={30}
                  src={imageUrl}
                  className={headerStyles.userImage}
                  alt="profilePhoto"
                />
              </span>
            }
          >
            <NavItem
              key="Profile"
              to="/profile"
              className={c(
                headerStyles.menuItem,
                isItemActive('profile', pathname) ? headerStyles.menuItemActive : {},
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              {t('profile')}
            </NavItem>
            <NavItem
              key="SignOut"
              onClick={onSignOut}
              className={headerStyles.menuItem}
              linkStyle={headerStyles.menuLink}
              activeStyle={c(
                headerStyles.menuItemActive,
                headerStyles.menuItemBorder,
              )}
            >
              {t('signout')}
            </NavItem>
          </DropdownButton>
        </Nav>
        <Nav className={headerStyles.optionalBlock}>
          <DropdownButton
            id="profile"
            buttonStyle={headerStyles.link}
            activeStyle={headerStyles.activeStyle}
            title={
              <span>
                <IconPublic className={headerStyles.prefixIcon} />
                {t('language')}
              </span>
            }
          >
            <NavItem
              key="en"
              href={window.location.origin + window.location.pathname + '?locale=en'}
              className={c(
                headerStyles.menuItem,
                isItemActive('profile', pathname) ? headerStyles.menuItemActive : {},
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              English
            </NavItem>
            <NavItem
              key="zh-TW"
              href={window.location.origin + window.location.pathname + '?locale=zh-TW'}
              className={headerStyles.menuItem}
              linkStyle={headerStyles.menuLink}
              activeStyle={c(
                headerStyles.menuItemActive,
                headerStyles.menuItemBorder,
              )}
            >
              繁體中文
            </NavItem>
            <NavItem
              key="zh-CN"
              href={window.location.origin + window.location.pathname + '?locale=zh-CN'}
              className={headerStyles.menuItem}
              linkStyle={headerStyles.menuLink}
              activeStyle={c(
                headerStyles.menuItemActive,
                headerStyles.menuItemBorder,
              )}
            >
              简体中文
            </NavItem>
          </DropdownButton>
        </Nav>
      </div>
    </header>
  );
};

export default compose(
  pure,
  withState('helpList', 'setHelpList', resourcesConfig.helpList),
  // withState('resourcesList', 'setResourcesList', resourcesConfig.resourcesList),
  withState('basePath', 'setBasePath', () => `${window.location.origin}/`),
  withHandlers({
    onSignOut: props => () => {
      browserHistory.push('/login');
      props.signOut();
    },
  }),
  withGetMessages(messages, 'Header'),
)(Header);
