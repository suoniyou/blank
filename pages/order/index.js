import {
  getOrderlist,
  getzyOrderlist
} from '../api/order';
Page({
  data: {
    tabList: [{
        name: '全部'
      },
      {
        name: '即将到账'
      },
      {
        name: '已到账'
      },
      {
        name: '已失效'
      },
      {
        name: '已维权'
      }
    ],
    currentIndex: 0,
    tabcurrentlist: ['返利订单', '自营订单'],
    tabcurrent: 0,
    orderList: [],
    zyOrderList: [],
    pageindex: 1,
    totalPage: 0
  },
  changeTab(e) {
    let that = this
    let index = e.currentTarget.dataset.index
    that.setData({
      currentIndex: index
    })
    this.getOrderlist(index)
  },
  getOrderlist(status) {
    getOrderlist({
      status: status
    }).then(res => {
      this.setData({
        orderList: res.data
      })
    })
  },
  getzyOrderlist(pageindex) {
    let obj = {
      p: pageindex ? pageindex : 1,
    }
    getzyOrderlist(obj).then(res => {
      if (res.code == 200) {
        if (obj.p === 1) {
          this.setData({
            zyOrderList: res.data,
            totalPage: res.data.totalnum
          })
        } else {
          let newItems = JSON.parse(JSON.stringify(this.data.zyOrderList))
          for (let i = 0; i < items.length; i++) {
            newItems.push(items[i])
          }
          this.setData({
            zyOrderList: newItems
          })

        }


      }
    })
  },
  goToPay(e) {
    let tradeno = e.currentTarget.dataset.tradeno
    my.tradePay({
      // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号 trade_no
      tradeNO: tradeno,
      success: res => {
        console.log(res, 'res');
        if (res.resultCode == 9000) {
          my.navigateTo({
            url: '/pages/paySucess/paySucess?code=' + res.resultCode
          })

        }
      },
      fail: res => {
        my.navigateTo({
          url: '/pages/paySucess/paySucess?code=' + res.resultCode
        })
      },
    });

  },
  lower() {
    const that = this
    that.setData({
      pageindex: that.data.pageindex + 1
    })
    const listLength = that.data.zyOrderList.length
    console.log(that.data.pageindex, that.data.totalPage);
    if (that.data.pageindex <= that.data.totalPage && listLength < that.data.totalPage) {
      that.getzyOrderlist(that.data.pageindex)



    }
  },
  changeTabOrderName(e) {
    this.setData({
      tabcurrent: e.currentTarget.dataset.index
    })
  },

  onLoad(query) {
    this.getOrderlist(0)
    this.getzyOrderlist()
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
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