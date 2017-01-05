export function prototypeHandler(ctx) {
  console.log('prototype page!');
    // 手法1：等資料取回後再廣播更新畫面
    this.doAction('toggleLoading')(true, '載入中請稍候'); // 顯示 loading spinner

    // server rendering 時可偵聽這裏返還出去的 Promise，即能偵知 data fetching 完成
    // 並且此期間先顯示 loading 訊息
    // return this.doAction('openViewLayout')()
     // .then( () => {
        // 資料抓好了，廣播切換畫面
        // 意義等同這句 this.doAction('changeRoute')('master');
      this.doAction('changeRoute')('prototypes');
      this.doAction('toggleLoading')(false); // 關掉 loading spinner
        // console.log( '資料抓好囉 - master' );
      // });
}
export function prototypeDetailHandler(ctx) {
  var prototypeId = ctx.params.projectId;
  console.log('prototype detail page!');
}