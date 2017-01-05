import types from '../constants/ActionTypes';

// routr.js 操作這支指令來切換 stateTree.routes.currentView 值
// 它在 routr.js 裏會 alias 為 this.route(view)
export function changeRoute(view) {
  return {
    type: types.ROUTE_CHANGE,
    view
  };
}

// 例如切換畫面或載入資料時，畫面上顯示 loading spinner
export function toggleLoading( show:Boolean, msg:String ) {
  // console.log( '\ntoggleLoading: ', show, ' >msg: ', msg );
  return {
    type: types.TOGGLE_LOADING,
    msg,
    show
  };
}
