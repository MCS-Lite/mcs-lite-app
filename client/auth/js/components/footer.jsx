import React from 'react';
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
var Footer = React.createClass({
  render: function() {

    var footer = '';

    if (/\.cn$/.test(window.location.hostname)) {
      footer = <footer style={ footerStyle }>© 2015 联发科技 版权所有&nbsp;&nbsp;&nbsp;&nbsp;京ICP备15035206号</footer>;
    } else {
      footer = <footer style={ footerStyle }>© 2015 MediaTek Inc. All Rights Reserved.</footer>;
    }

    return (
      <div>
        {footer}
      </div>
    );
  },
});

export default Footer;
