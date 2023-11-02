let app = getApp()
export function request(config) {
  let host = app.globalData.host;
  let token = my.getStorageSync({
    key: 'token'
  });

  // 解构赋值
  let {
    url = '',
      data = {},
      method = 'POST',
  } = {
    ...config
  }
  // if (config.url == '/home/index/alipaygoods') {
  //   // 加载loading
  //   my.showLoading({
  //     content: '加载中...',
  //     // delay: 10000,
  //   });
  // }

  return new Promise((resolve, reject) => {
    my.request({
      url: host + url,
      method: method,
      data: {
        ...data
      },

      header: {
        "x-token": token.data
      },
      success: (res) => {
        if (res.data.code == 200) {
          resolve(res.data)
        } else if (res.data.code == 101) {
          my.switchTab({
            url: '/pages/index/index'
          })
        } else {
          my.showToast({
            type: 'none',
            content: res.data.msg,
            duration: 3000

          });
        }


        resolve(res.data)
        my.hideLoading()
      },
      fail: (err) => {
        my.hideLoading();
        reject(err)
      }
    });
  })


}