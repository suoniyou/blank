Page({
  data: {
    token: '',
    url: ''
  },
  onmessage(e) {
    console.log(e.detail.data, '1212');
  },
  onLoad(query) {
    console.log(query, 'query');
    if (query.coupon_click_url) {
      this.setData({
        url: query.coupon_click_url
      })
      return
    } 
    if (query.authUrl) {
      this.setData({
        url: query.url
      })
      return
    }
    if(query.linkurl){
      this.setData({
        url: query.linkurl
      })
      return
    }
    else {
      let res = my.getStorageSync({
        key: "token"
      })
      this.setData({
        url: 'https://oauth.m.taobao.com/authorize?response_type=code&client_id=34030873&redirect_uri=https://test.huimai88.com/user/user/publisher&state=' + res.data

      })
      console.log(res.data, 'res');

    }


  },
  onShow(e) {

  }
});