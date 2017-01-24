import React from 'react';
import PageConstants from './constants/pageConstants.js';

// component
import SignUpForm from './components/signupform.jsx';
import TermsOfUse from './components/termofuse.jsx';
import Login from './components/login.jsx';
import Verify from './components/verify.jsx';
import Waiting from './components/waiting.jsx';
import Forgetpassword from './components/forgetpassword.jsx';
import Resetpassword from './components/resetpassword.jsx';
import Footer from './components/footer.jsx';

// store
import AppStore from './stores/appStore.js';

function appState() {
  return AppStore.init();
}

const Oauth = React.createClass({

  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return appState();
  },

  render: function() {
    let elem = '';
    switch (this.state.APP_PAGE) {
    case PageConstants.SIGNUP:
      elem = <SignUpForm { ... this.state }/>;
      break;
    case PageConstants.VERIFY:
      elem = <Verify { ... this.state } />;
      break;
    case PageConstants.WAITING:
      elem = <Waiting { ... this.state }/>;
      break;
    case PageConstants.TERMSOFUSE:
      elem = <TermsOfUse { ... this.state }/>;
      break;
    case PageConstants.LOGIN:
      elem = <Login { ... this.state }/>;
      break;
    case PageConstants.FORGETPASSWORD:
      elem = <Forgetpassword { ... this.state }/>;
      break;
    case PageConstants.RESETPASSWORD:
      elem = <Resetpassword { ... this.state }/>;
      break;
    default:
    }
    return (
      <div>
        { elem }
        <Footer />
      </div>
    );
  },

  _onChange: function() {
    this.setState(appState());
  },

});

React.render(
  <Oauth />,
  document.getElementById('oauth')
);
