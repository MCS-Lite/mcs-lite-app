import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// import { actions as routingActions } from '../../modules/routing';

const defaultLocale = 'zh-TW';
let location = window.location;

if (!location.query) location.query = {};

class IntlProvider extends React.Component {
  componentDidMount() {
    // Hint: Set to default locale. "/" => "/?locale=zh-TW"
    if (!location.query.locale) {
      location.query.locale = 'zh-TW';
    }
  }

  render() {
    return (
      <ReactIntlProvider
        {...this.props}
        defaultLocale={defaultLocale}
        locale={location.query.locale || defaultLocale}
        messages={{}}
      />
    );
  }
}

export default IntlProvider;