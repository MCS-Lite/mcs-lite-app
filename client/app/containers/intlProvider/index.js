import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// import { actions as routingActions } from '../../modules/routing';
import translation from '../../../messages/translations.json';
import { query } from '../../utils/url';

const defaultLocale = 'en';
const qs = query(window.location.search.substr(1).split('&'));

class IntlProvider extends React.Component {
  render() {
    return (
      <ReactIntlProvider
        {...this.props}
        defaultLocale={defaultLocale}
        locale={qs['locale'] || defaultLocale}
        messages={translation[qs['locale']]}
      />
    );
  }
}

export default IntlProvider;