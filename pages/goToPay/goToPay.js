Page({
  data: {
    productPrice: '',
    tradeno: '',
    productTitle: '',
    payRadio: [
      //   {
      //   name: '账户余额',
      //   value: '账户余额'
      // }, 
      // {
      //   name: '支付宝支付',
      //   value: '支付宝支付'
      // }
    ],
    timer: 15
  },
  radioChange(e) {
         

  },
  goToPay() {
    my.tradePay({
      // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号 trade_no
      tradeNO: this.data.tradeno,
      success: res => {
        
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
  onPayTime() {
    let t = 15
    setInterval(() => {
      if (t > 0) {
        this.setData({
          timer: t--
        })
      }


    }, 1000);
    // clearInterval(interval);
     
  },
  onLoad(query) {
    this.setData({
      productPrice: query.productPrice,
      tradeno: query.tradeno,
      productTitle: query.title
    })

    // this.onPayTime()
  },
});