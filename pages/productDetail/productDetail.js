import {
  getBaseInfo,
  getDetail
} from '../api/productDetail'
import {
  Base64
} from "../../utils/base64"
const app = getApp()
Page({
  data: {
    detailImage: Object,
    detailsArr: [],
    getBaseInfo: Object,
    skuList: [],
    current: 0,
    itemContent: Object,
    defaultPrice: '',
    baseInfo: {}
  },
  getBaseInfo(id) {
    getBaseInfo({
      id: id
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          baseInfo: res.data,
          skuList: JSON.parse(res.data.skus)
        })
      }
      this.setData({
        defaultPrice: this.data.skuList[0].price
      })
    })
  },
  getDetail(id) {
    getDetail({
      id: id
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          detailImage: Base64.decode(res.data)
        })
        let image = JSON.parse(this.data.detailImage)
        let arr = Object.keys(image).map(function (i) {
          return {
            ...i,
            url: image[i]
          };
        });
        this.setData({
          detailsArr: arr
        })
      }
    })
  },
  goBuyChange() {

    const {
      id,
      pic,
      title
    } = {
      ...this.data.baseInfo
    }
    let obj = {
      id,
      pic,
      title
    }
    my.navigateTo({
      url: '/pages/Address/Address?itemContent=' + encodeURIComponent(JSON.stringify(obj)) + '&skus=' + encodeURIComponent(JSON.stringify(this.data.itemContent)) + '&defaultSku=' + encodeURIComponent(JSON.stringify(this.data.skuList[0]))
    })
  },
  onCheckSku(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      current: index,
      itemContent: e.currentTarget.dataset.item
    })

  },
  onLoad(query) {
    let id = app.globalData.goodsId //使用scheme跳转获取到的id
    if(id){
      this.getDetail(id)
      this.getBaseInfo(id)
    }else{
      this.getDetail(query.id)
      this.getBaseInfo(query.id)
    }
  },

   
  onShow(options){
    my.hideBackHome()
  }
});