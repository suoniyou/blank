App({
  globalData: {
    host: 'https://test.huimai88.com',
    token: '',
    authCode: '',
    Verifyflag:false
  },
  getAuthCodefun() {
    return new Promise((resolve, reject) => {
      my.getAuthCode({
        scopes: 'auth_base',
        success: res => {
          this.globalData.authCode = res.authCode;
          resolve(res.authCode)
        },
        fail: err => {
          reject(err)
          console.log('my.getAuthCode 调用失败', err)
        }

      });


    })


  },
  gettoken(authCode) {
    return new Promise((resolve, reject) => {
      my.request({
        // 你的服务器地址
        url: 'https://test.huimai88.com/user/user/alipaylogin',
        method: 'POST',
        data: {
          authcode: authCode
        },
        success(res1) {
          if(res1.data.code == 200){
            console.log(res1)
            resolve(res1.data.data.token)
          }else{
            my.showToast({
              type: 'none',
              content: res1.data.msg,
              duration:3000
              
            });
            
          }
        


        },
        fail(err){
          console.log(err)
          reject(err)
        } 
      })


    })





  },
  async allfun() {
    try {
      const Codefun = await this.getAuthCodefun()
      const token = await this.gettoken(Codefun)
      this.globalData.token = token;
      my.setStorageSync({
        key: 'token',
        data: token
      })
      this.triggerTokenObtained();

    } catch (err) {

    }

  },
  triggerTokenObtained() {
    if (this.tokenObtainedCallback) {
      this.tokenObtainedCallback();
    }
  },

  onLaunch(options) {
   
    // let token = my.getStorageSync({
    //   key: 'token'
    // });
    // console.log(token.data, 'token');
    // if (!token.data && token.data == null) {
       
    // }



  },
  onShow(options) {
    this.allfun()

    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});