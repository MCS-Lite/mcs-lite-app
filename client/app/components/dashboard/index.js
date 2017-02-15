import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';
import c from 'classnames';

const Dashboard = ({ ...props }) => {
  return (
    <div>
      <Header
        logoutFn={()=>{}}
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'/>
      123123
      <Footer />
    </div>
  );
}

export default Dashboard;