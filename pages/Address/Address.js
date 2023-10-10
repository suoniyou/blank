import {
  getCreatOrder
} from '../api/productDetail';
Page({
  data: {
    count: 1,
    result: null,
    itemContent: Object,
    skus: Object,
    defaultSku: Object,
    defaultPrice: '',
    changeprice: ''
  },
  onLoad(query) {
    if (query.skus === "undefined") {
      let sku = JSON.parse(decodeURIComponent(query.defaultSku))
      this.setData({
        defaultSku: sku
      })

    } else {
      let objsku = JSON.parse(query.skus)
      this.setData({
        skus: objsku,
        defaultPrice: objsku.price
      })
      let changeprice = this.data.skus.price
      this.setData({
        changeprice: changeprice
      })


    }
    console.log(this.data.defaultSku);
    this.setData({
      itemContent: JSON.parse(decodeURIComponent(query.itemContent))

    })
  },
  onAdressList() {
    let that = this
    my.getAddress({
      success: function (res) {
        that.setData({
          result: res.result
        })
        console.log(res.result);
      },
      fail: function (err) {
        console.log(err);
      }
    });

  },
  //金额显示.00格式
  NumFormat(value) {
    if (!value) return '0.00'
    value = value.toFixed(2)
    var intPart = Math.trunc(value) // 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
    var floatPart = '.00' // 预定义小数部分
    var value2Array = value.split('.')
    // =2表示数据有小数位
    if (value2Array.length === 2) {
      floatPart = value2Array[1].toString() // 拿到小数部分
      if (floatPart.length === 1) {
        return intPartFormat + '.' + floatPart + '0'
      } else {
        return intPartFormat + '.' + floatPart
      }
    } else {
      return intPartFormat + floatPart
    }
  },

  onAddNum() {
    let changeprice = this.data.skus.price;
    let defaultprice = this.data.defaultSku.price
    this.setData({
      count: this.data.count + 1,
      changeprice: this.NumFormat((changeprice || defaultprice) * (this.data.count + 1))

    })
     



  },
  onJianNum() {
    let changeprice = this.data.skus.price
    let defaultprice = this.data.defaultSku.price
    if (this.data.count > 1) {
      this.setData({
        count: this.data.count - 1,
        changeprice:this.NumFormat((changeprice || defaultprice) * (this.data.count - 1).toFixed(2)),
      })
      //this.data.skus.price = this.data.skus.price * this.data.count
    }

  },
  goToPay() {
    let data = this.data
    if (data.result == null) {
      my.showToast({
        content: '请填写地址'
      })
      return
    }
    let obj = {
      id: data.itemContent.id,
      sku_id: data.skus.id || data.defaultSku.id,
      num: this.data.count.toString(),
      address: data.result.address + '/' + data.result.fullname + '/' + data.result.mobilePhone

    }
    getCreatOrder(obj).then(res => {
      if (res.code == 200) {
        my.navigateTo({
          url: '/pages/goToPay/goToPay?productPrice=' + res.data.pay_amount + '&tradeno=' + res.data.trade_no + '&title=' + res.data.title
        })
      }
    })

  }
});