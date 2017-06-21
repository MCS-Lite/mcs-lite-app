import React from 'react';
import { IntlProvider as ReactIntlProvider } from 'react-intl';
import { connect } from 'react-redux';
// import { actions as routingActions } from '../../modules/routing';
import translation from '../../../messages/translations.json';
import { query } from '../../utils/url';

const qs = query(window.location.search.substr(1).split('&'));
const defaultLocale = 'zh-TW';

class IntlProvider extends React.Component {
  componentWillMount() {
    // Hint: Set to default locale. "/" => "/?locale=zh-TW"
    if (!/locale\=/.test(window.location.search)) {
      let language;

      if (localStorage.getItem('locale')) {
        language = localStorage.getItem('locale');
      } else {
        localStorage.setItem('locale', navigator.language);
        language = navigator.language;
      }

      if (!/\?/.test(window.location.href)) {
        window.location.href = window.location.href + '?locale=' + language;
      } else {
        window.location.href = window.location.href + '&locale=' + language;
      }

    } else {
      localStorage.setItem('locale', qs['locale']);
    }
  }

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