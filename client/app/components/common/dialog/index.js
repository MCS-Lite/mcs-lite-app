import React from 'react';
import c from 'classnames';
import { Dialog as MTKDialog } from 'mtk-ui';
import prue from 'recompose/pure';

import styles from './styles.css';

const Dialog = ({ children, className, ...props }) => (
  <MTKDialog
    className={c(styles.dialog, className)}
    {...props}
  >
    {children}
  </MTKDialog>
);

export default prue(Dialog);
