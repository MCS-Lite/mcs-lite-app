/* eslint no-unused-expressions:0 */

import { injectGlobal } from 'styled-components';
import { theme } from 'mcs-lite-theme';

injectGlobal`
  html {
    font-size: ${theme.base.fontSize};
    line-height: ${theme.base.lineHeight};
  }
`;
