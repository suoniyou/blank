import {
  getAmount,
  getCreditagreementt,
  getVerify
} from '../api/withdraw';
const app = getApp()
Page({
  data: {
    amount: 0,
    paysucc: 0,
    confirm: 0,
    Verifyflag: false

  },


  getAmount1() {
    getAmount().then(res => {
      if (res.code == 200) {
        this.setData({
          amount: res.data.amount,
          paysucc: res.data.paysucc,
          confirm: res.data.confirm
        })
      }

    })
  },
  clickJump() {
    my.navigateTo({
      url: '../withDrawNow/withDrawNow'
    })
  },

  clickJumpRecord() {
    my.navigateTo({
      url: '../withdrawRecord/withdrawRecord'
    })
  },
  onAuthorize() {
    getCreditagreementt().then(res => {
      if (res.code == 200) {
        if (res.data) {
          my.navigateTo({
            url: '/pages/web/web?authUrl=' + res.data
          })
        //  app.globalData.Verifyflag = true
         // console.log('已经授权了,true', app.globalData.Verifyflag);
        }

      }



    })
    // my.showToast({
    //   type: 'none',
    //   content: '功能待开放',
    //   duration: 2000,

    // })
  },

  funVerifyflag() {
    this.setData({
      Verifyflag: app.globalData.Verifyflag
    })
    //console.log(this.data.Verifyflag, 'Verifyflag');
  },
  onLoad(query) {
    this.funVerifyflag()

    my.setNavigationBar({
      frontColor: '#000000',
      backgroundColor: '#FFE100'
    })
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);

  },
  onReady() {
    // 页面加载完成
  },

  onShow() {
    this.getAmount1()
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '福利鸭',
      desc: '购物领券拿返利，90%商品都可返',
      path: 'pages/index/index',
    };
  },
});