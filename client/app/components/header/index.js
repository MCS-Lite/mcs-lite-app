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

import logo from './web_logo.png';
import resourcesConfig from './configs/resources';

const Header = ({
  isMenuActive,
  isItemActive,
  helpList,
  resourcesList,
  basePath,
  imageUrl,
  logoutFn,
}) => {
  return (
    <header className={headerStyles.base}>
      <div className={headerStyles.container}>
        <Nav>
          <NavItem href= "/prototypes"
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
                <i className="fa fa-wrench" className={headerStyles.prefixIcon} />
                Development
              </span>
            }
          >
            <NavItem
              href="/prototypes"
              className={c(
                headerStyles.menuItem,
                isItemActive('development') ? headerStyles.menuItemActive : {},
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              Prototype
            </NavItem>
            <NavItem
              href="/devices"
              className={c(
                headerStyles.menuItem,
                isItemActive('testdevices') ? headerStyles.menuItemActive : {},
                { borderRadius: '0 0 4px 4px' },
              )}
              linkStyle={headerStyles.menuLink}
              activeStyle={headerStyles.menuItemActive}
            >
              Devices
            </NavItem>
          </DropdownButton>
        </Nav>
        <Nav className={{ float: 'right' }}>
            <DropdownButton
              buttonStyle={c(
                headerStyles.link,
                isMenuActive('resourcesList') && headerStyles.activeStyle,
              )}
              activeStyle={headerStyles.activeStyle}
              title={
                <span>
                  <i className="fa fa-inbox" className={headerStyles.prefixIcon}/>
                  Resources
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
                        array.length === index + 1 ? { borderRadius: '0 0 4px 4px' } : {},
                      )}
                      linkStyle={headerStyles.menuLink}
                      activeStyle={c(
                        headerStyles.menuItemActive,
                        array.length === index + 1 ? { borderRadius: '0 0 4px 4px' } : {},
                      )}
                    >
                      { entry.name }
                    </NavItem>
                  );
                })
              }
            </DropdownButton>
            <DropdownButton
              id='feedbackUserVoice'
              buttonStyle={c(
                headerStyles.link,
                isMenuActive('helpList') && headerStyles.activeStyle,
              )}
              activeStyle={headerStyles.activeStyle}
              title={
                <span>
                  <i className="fa fa-comments-o" className={headerStyles.prefixIcon}/>
                  Help
                </span>
              }
            >
              {
                helpList.map((entry, index) => {
                  return (
                    <NavItem key={index} href={`${basePath}${entry.path}`}
                      className={c(
                        headerStyles.menuItem,
                        isItemActive(entry.path) ? headerStyles.menuItemActive : {},
                      )}
                      linkStyle={headerStyles.menuLink}
                      activeStyle={headerStyles.menuItemActive}
                    >
                      { entry.name }
                    </NavItem>
                  );
                })
              }
              <NavItem key="Forum"
                href="http://labs.mediatek.com/forums/forums/show/48.page"
                target="_blank"
                className={headerStyles.menuItem}
                linkStyle={headerStyles.menuLink}
                activeStyle={headerStyles.menuItemActive}
              >
                Forum
              </NavItem>
            </DropdownButton>
            <DropdownButton
              buttonStyle={headerStyles.link}
              activeStyle={headerStyles.activeStyle}
              title={
                <span>
                  <img src={imageUrl} className={headerStyles.userImage} />
                </span>
              }
            >
              <NavItem key="Profile"
                href="/profile"
                className={headerStyles.menuItem}
                linkStyle={headerStyles.menuLink}
                activeStyle={headerStyles.menuItemActive}>
                Profile
              </NavItem>
              <NavItem key="TermsOfUse"
                href={`${basePath}terms_of_use/`}
                className={headerStyles.menuItem}
                linkStyle={headerStyles.menuLink}
                activeStyle={headerStyles.menuItemActive}>
                Terms of use
              </NavItem>
              <NavItem key="SignOut"
                onClick={()=>logoutFn()}
                className={headerStyles.menuItem}
                linkStyle={headerStyles.menuLink}
                activeStyle={c(
                  headerStyles.menuItemActive,
                  { borderRadius: '0 0 4px 4px' },
                )}
              >
                Sign out
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
)(Header);