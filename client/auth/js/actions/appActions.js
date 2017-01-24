var AppDispatcher = require('../dispatcher/appDispatcher');
var PageConstants = require('../constants/pageConstants');
var request = require('superagent');

var appActions = {

  getLang: function() {
    var i18nHost = /\.((cn)|(com)|(io)|(inc))$/.exec(window.location.hostname);
    i18nHost = i18nHost && i18nHost[0];
    var i18nPath = /\/((zh-TW)|(zh-CN)|(en))/.exec(window.location.pathname);
    i18nPath = i18nPath && i18nPath[0];

    var lang;

    if (i18nHost === '.cn') {
      switch (i18nPath){
        case '/en':
          lang = 'en';
          break;

        case '/zh-TW':
          lang = 'zh-TW';
          break;

        case '/zh-CN':
          lang = 'zh-CN';
          break;

        case null:
        default:
          lang = 'zh-CN';
          break;
      }
    } else {
      switch (i18nPath){
        case '/en':
          lang = 'en';
          break;

        case '/zh-TW':
          lang = 'zh-TW';
          break;

        case '/zh-CN':
          lang = 'zh-CN';
          break;

        case null:
        default:
          lang = 'en';
          break;
      }
    }

    return lang;
  },

  getQuery: function(name) {
    var match;
    var pl     = /\+/g; /* Regex for replacing addition symbol with a space */
    var search = /([^&=]+)=?([^&]*)/g;
    var query  = window.location.search.substring(1);
    var decode = function(s) {
      return decodeURIComponent(s.replace(pl, ' '));
    };

    var urlParams = {};
    while (match = search.exec(query)) {
      urlParams[decode(match[1])] = decode(match[2]);
    }

    return urlParams[name];
  },

  getCookie: function(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }

    }

    return '';
  },

  setCookie: function(name, value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; domain=mcs.mediatek.io; path=/';
  },

  changePage: function(page, success, err) {
    AppDispatcher.dispatch({
      APP_PAGE: page,
      errorMsg: success || null,
      successMsg: err || null
    });
  },

  checkPassword: function(page, errorMsg) {
    AppDispatcher.dispatch({
      APP_PAGE: page,
      errorMsg: errorMsg || null,
      successMsg: null
    });
  },

  sendVerifyEmail: function(email) {
    var lang = this.getLang();
    var this$ = this;
    return new Promise((resolve, reject) => {
      request
      .post(`/oauth/verification?lang=${this$.getLang()}`)
      .send({email: email, lang: lang})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        return res.ok ? resolve(res) : reject(err);
      });
    })

    .then((data)=> {
      return AppDispatcher.dispatch({
        APP_PAGE: 'WAITING',
        title: __('Resend completed!'),
        successMsg: __('Please check your email inbox for registration verification mail!'),
        errorMsg: null
      });
    });

  },

  signUp: function(data) {
    data.lang = this.getLang();
    var this$ = this;
    return new Promise((resolve, reject) => {
      request
      .post(`/oauth/signup?lang=${this$.getLang()}`)
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) {
          return reject(res);
        }

        return resolve(res);
      });
    })

    .then((data)=> {
      delete localStorage.newAccount;
      return AppDispatcher.dispatch({
        APP_PAGE: 'WAITING',
        title: __('Registration completed!'),
        successMsg: __('Please check your email inbox for registration verification mail!'),
        errorMsg: null
      });
    })

    .catch((err) => {
      return AppDispatcher.dispatch({
        APP_PAGE: 'SIGNUP',
        errorMsg: __('This email was registed!'),
        successMsg: null
      });
    });
  },

  signInWithLabs: function(code) {
    var lab = window.mediatekLab.replace('http://', 'https://');
    if (/cn/.test(document.location.host)) {
      var labRedirectUrl = lab + '/oauth/token?grant_type=authorization_code&code=' + code + '&client_id=sandbox_cn&scope=user_read';
    } else {
      var labRedirectUrl = lab + '/oauth/token?grant_type=authorization_code&code=' + code + '&client_id=sandbox&scope=user_read';
    }

    request
    .get(labRedirectUrl)
    .withCredentials()
    .set('Authorization', 'Basic c2FuZGJveDp0ZXN0U2VjcmV0')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (res.ok) {
        var redirectUrl = document.location.host.replace('api.', 'mcs.');
        document.location.href = '//' + redirectUrl + '/oauth/redirect_url?token=' + res.body.access_token;
      }
    });

  },

  resetPassword: function(data) {
    data.lang = this.getLang();
    var this$ = this;
    return new Promise((resolve, reject) => {
      request
      .put(`/oauth/password?lang=${this$.getLang()}`)
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) {
          return reject(res);
        }

        return resolve(res);
      });
    })

    .then((data)=> {
      return AppDispatcher.dispatch({
        APP_PAGE: 'WAITING',
        title: __('Reset password'),
        successMsg: __('Password reset completed. Please wait for login prompt...'),
        errorMsg: null
      });
    })

    .catch((err) => {
      return AppDispatcher.dispatch({
        APP_PAGE: 'SIGNUP',
        errorMsg: err.body.message,
        successMsg: null
      });
    });
  },

  forgetPassword: function(data) {
    var email = data.email;
    data.lang = this.getLang();
    var this$ = this;
    return new Promise((resolve, reject) => {
      request
      .post(`/oauth/password?lang=${this$.getLang()}`)
      .send(data)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) {
          return reject(res);
        }

        return resolve(res);
      });
    })

    .then((data)=> {
      return AppDispatcher.dispatch({
        APP_PAGE: 'WAITING',
        title: __('Forget password'),
        successMsg: __('An email has been sent to ') + email + __(', please check your mailbox for password reset.'),
        errorMsg: null
      });
    })

    .catch((err) => {
      return AppDispatcher.dispatch({
        APP_PAGE: 'FORGETPASSWORD',
        errorMsg: err.body.message,
        successMsg: null
      });
    });
  }

};

export default appActions;
