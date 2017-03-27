/* eslint import/prefer-default-export: 0 */

import R from 'ramda';

export const switchToMobilePathname =
  R.evolve({ pathname: R.concat('/mobile') });
