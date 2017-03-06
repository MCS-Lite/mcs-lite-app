import React from 'react';

import c from 'classnames';
import navStyles from './nav.css';

const Nav = ({ className, children, dropdownMenu }) => (
  <ul
    className={c(
      dropdownMenu ? navStyles.dropdownMenu : navStyles.list,
      className,
    )}
  >
    {children}
  </ul>
);

export default Nav;
