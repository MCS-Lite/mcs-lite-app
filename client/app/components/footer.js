import React, { Component } from 'react';

const footerStyle = {
  background: '#353630',
  textAlign: 'center',
  position: 'fixed',
  bottom: '0px',
  width: '100%',
  height: '30px',
  lineHeight: '30px',
  color: '#fff',
};

const Footer = () => {
  return (
    <div>
      <footer style={ footerStyle }>© 2017 MediaTek Inc. All Rights Reserved.</footer>
    </div>
  );
}

export default Footer