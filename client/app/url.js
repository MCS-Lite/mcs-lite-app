import { default as React } from 'react';

if (/.cn/.test(window.location.hostname)) {
  window.domainUrl = 'mcs.mediatek.cn';
} else {
  window.domainUrl = 'mcs.mediatek.com';
}

export default class Url extends React.Component {
  static handleGotoPage(url, _blank) {
    if (_blank) {
      window.open(url, '_blank');
    } else {
      window.location = url;
    }
  }

  static url = {}
}
