import React, { Component } from 'react';
var footerStyle = {
  background: '#353630',
  textAlign: 'center',
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  height: '30px',
  lineHeight: '30px',
  color: '#fff',
};

class Footer extends Component {
  render() {
    return (
      <div>
        <footer style={ footerStyle }>© 2016 MediaTek Inc. All Rights Reserved.</footer>
      </div>
    );
  }
}

export default Footer