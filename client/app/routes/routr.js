import page from 'page';
import * as IDEActions from '../actions/AppActions';

import * as Admin from './admin/index';
import * as Devices from './devices/index';
import * as Prototypes from './prototypes/index';

export default class Routr {
  constructor(store) {
    // 由於最常用到，因此額外包一支方便之後切換路徑
    this.route = function(path) {
      this.doAction('changeRoute')(path);
    }

    this.doAction = function(action) {
      return function() {
        return store.dispatch(IDEActions[action].apply( null, arguments));
      }
    }
    let routines = require('../routings.js');

    let handlers = {
      ...Admin,
      ...Devices,
      ...Prototypes,
    };

    console.log(handlers);

    routines.forEach((item) => {
      page( item.path, handlers[item.handler].bind(this) );
    })

    setTimeout( () => {
      // 真正啟動 router，注意它只負責 client-side routing
      console.log('Client Router 啟動');
      // isomorphic 時這裏看 store.__restored__ 來判斷是否已還原過值
      // 如果 true，則不要發出 initial 事件，以避免 todoReadAll()又去拉一次資料
      // page({dispatch: !store.__restored__});
      page({ dispatch: true })
    }, 0)
  }

  // prototypeHandler(ctx) {
  //   console.log('prototype page!');
  //   // 手法1：等資料取回後再廣播更新畫面
  //   this.doAction('toggleLoading')(true, '載入中請稍候'); // 顯示 loading spinner

  //   // server rendering 時可偵聽這裏返還出去的 Promise，即能偵知 data fetching 完成
  //   // 並且此期間先顯示 loading 訊息
  //   // return this.doAction('openViewLayout')()
  //    // .then( () => {
  //       // 資料抓好了，廣播切換畫面
  //       // 意義等同這句 this.doAction('changeRoute')('master');
  //     this.doAction('changeRoute')('prototypes');
  //     this.doAction('toggleLoading')(false); // 關掉 loading spinner
  //       // console.log( '資料抓好囉 - master' );
  //     // });
  // }

}

