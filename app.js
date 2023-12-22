App({
  globalData: {
    host: 'https://test.huimai88.com',
    token: '',
    authCode: '',
    Verifyflag: false,
    code1: '',
    sharePagePath:'',
    goodsId:''
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
          if (res1.data.code == 200) {
            resolve(res1.data.data.token)
            
          }
           else {
            my.showToast({
              type: 'none',
              content: '登陆异常',
              duration: 3000

            });

          }



        },
        fail(err) {
         
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
      this.getVerifyStstus()
      this.triggerTokenObtained();
     


    } catch (err) {

    }

  },
 triggerTokenObtained() {
    if (this.tokenObtainedCallback) {
      this.tokenObtainedCallback();
    }
  },
  //支付宝急速返授权状态检查
  getVerifyStstus() {
    let token = my.getStorageSync({
      key: "token"
    })
   if(token.data){
    my.request({
      // 你的服务器地址
      url: 'https://test.huimai88.com/home/zhima/verify',
      method: 'GET',
      header: {
        "x-token": token.data
      },

      success(res1) {
        if (res1.data.code == 200) {
          my.setStorageSync({
            key: 'code1',
            data: res1.data.data
          })
     
         // resolve(res1.data.data)

         } else {


        }
      },
      fail(err) {
        
        reject(err)
      }
    })
   }

  },

  onLaunch(options) {
    
    let token = my.getStorageSync({key:'token'})
    if(!token.data){
      this.allfun()
      
    }else{
      this.triggerTokenObtained();
      this.getVerifyStstus()  
     
    }
   
   
  

  },
  onShow(options) {
     
    //this.globalData.sharePagePath = options.path //分享赚页面签约返回参数
   if(options.query){
      my.setStorageSync({
        key: 'sharePagePath',
        data: options.query.signed_state
      })
      this.globalData.goodsId = options.query.id
      
    }
    
   
    // this.allfun()

    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});