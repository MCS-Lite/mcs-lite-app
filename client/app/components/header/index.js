import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import Nav from './nav';
import NavItem from './navItem';

import headerStyles from './header.css';
import DropdownButton from './dropDownButton';

import c from 'classnames';

import MiDevelopment from 'mtk-icon/lib/MiDevelopment';
import IconResources from 'mcs-lite-icon/lib/IconResources';

import logo from './web_logo.png';
import resourcesConfig from './configs/resources';

import messages from './messages';
import withGetMessages from '../../utils/withGetMessage';
import { browserHistory } from 'react-router';

const Header = ({
  isMenuActive,
  isItemActive,
  helpList,
  resourcesList,
  basePath,
  imageUrl,
  getMessages: t,
}) => {
  return (
    <header className={headerStyles.base}>
      <div className={headerStyles.mask}></div>
      <div className={headerStyles.container}>
        <Nav>
          <NavItem href= "/dashboard"
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
              isMenuActive('developmentList') && headerStyles.activeStyle)}
            activeStyle={headerStyles.activeStyle}
            title={
              <span>
                <MiDevelopment className={headerStyles.prefixIcon}/>
                {t('development')}
              </span>
            }
          >
            <NavItem
              href="/prototypes"
              className={c(
                headerStyles.menuItem,
                isItemActive('prototypes') ? headerStyles.menuItemActive : {},
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              {t('prototype')}
            </NavItem>
            <NavItem
              href="/devices"
              className={c(
                headerStyles.menuItem,
                isItemActive('devices') ? headerStyles.menuItemActive : {},
                headerStyles.menuItemBorder,
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              {t('devices')}
            </NavItem>
          </DropdownButton>
          <DropdownButton
            id='resources'
            buttonStyle={c(
              headerStyles.link,
              isMenuActive('resourcesList') && headerStyles.activeStyle,
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
              resourcesList.map((entry, index, array) => {
                return (
                  <NavItem
                    key={index}
                    href={entry.path.startsWith('http') ? entry.path : basePath + entry.path}
                    className={c(
                      headerStyles.menuItem,
                      isItemActive(entry.path) ? headerStyles.menuItemActive : {},
                      array.length === index + 1 ? headerStyles.menuItemBorder : {},
                    )}
                    linkStyle={headerStyles.menuLink}
                    activeStyle={c(
                      headerStyles.menuItemActive,
                      array.length === index + 1 ? headerStyles.menuItemBorder : {},
                    )}
                  >
                    { entry.name }
                  </NavItem>
                );
              })
            }
          </DropdownButton>
        </Nav>
        <Nav className={headerStyles.optionalBlock}>
            <DropdownButton
              id='profile'
              buttonStyle={headerStyles.link}
              activeStyle={headerStyles.activeStyle}
              title={
                <span>
                  <img src={imageUrl} className={headerStyles.userImage} />
                </span>
              }
            >
              <NavItem
                key="Profile"
                href="/profile"
                className={headerStyles.menuItem}
                linkStyle={headerStyles.menuLink}
                activeStyle={headerStyles.menuItemActive}>
                {t('profile')}
              </NavItem>
              <NavItem
                key="SignOut"
                onClick={()=>browserHistory.push('/login')}
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
      </div>
    </header>
  );
}

export default compose(
  pure,
  withState('helpList', 'setHelpList', resourcesConfig.helpList),
  withState('resourcesList', 'setResourcesList', resourcesConfig.resourcesList),
  withState('basePath', 'setBasePath', () => window.location.origin + '/'),
  withHandlers({
    isMenuActive: props => (listName) => {
      switch (listName) {
        case 'prototypesList':
          return (/prototypes/.test(window.location.pathname));
        case 'devicesList':
          return (/devices/.test(window.location.pathname));
        case 'helpList':
          return (/resources/.test(window.location.pathname));
      }
    },
    isItemActive: props => (regPath) => {
      return new RegExp(regPath).test(window.location.pathname);
    },
  }),
  withGetMessages(messages, 'Header'),
)(Header);