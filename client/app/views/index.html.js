import { default as React } from 'react';
import {
  WebpackScriptEntry,
  WebpackStyleEntry,
} from 'reacthtmlpack/lib/entry';

export default (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <title>MCS Lite</title>
      <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height" />
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
      <meta property="og:title" content="Mediatek cloud sandbox Lite" />
      <meta property="og:type" content="website" />
      {process.env.DOMAIN_ENV === 'china' ? <meta property="og:image" content="https://mcs.mediatek.cn/opg_img.jpg" /> : <meta property="og:image" content="https://mcs.mediatek.com/opg_img.jpg" />}
      {process.env.DOMAIN_ENV === 'china' ? <meta property="og:url" content="https://mcs.mediatek.cn/7688/" /> : <meta property="og:url" content="https://mcs.mediatek.com/7688/" />}
      <meta property="og:description" content="MCS Lite" />
      <WebpackStyleEntry
        chunkName="vendorStyle"
        chunkFilepath="../scripts/vendorCSSEntry.js"
        configFilepath="../webpack.config.js" />
      <WebpackStyleEntry
        chunkName="client"
        chunkFilepath="../scripts/client.js"
        configFilepath="../webpack.config.js" />
    </head>
    <body>
      <div id="app" />
      <WebpackScriptEntry
        chunkName="client"
        chunkFilepath="../scripts/client.js"
        configFilepath="../webpack.config.js" />
    </body>
  </html>
);

