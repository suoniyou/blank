import {
  getIdDetail
} from "../api/home"
const app = getApp()
Page({
  data: {
    url:'',
    MediaQueryList:'',
    id:''
  },
  // getIdDetail(){
  //   getIdDetail().then(res=>{
  //     if(res){

  //     }
  //   })
  // },
  getIdDetail() {
    let that = this
    my.request({
      // 你的服务器地址
      url: 'https://test.huimai88.com/home/position/detail',
      method: 'GET',
      header: {},
      data: {
        id: that.data.id
      },

      success(res1) {
        if (res1.data.code == 200) {
          that.setData({
            url:res1.data.data
          })
          // my.navigateTo({
          //   url:'/pages/web/web?tianmaourl=' + res1.data.data
          // })
          // my.ap.openURL({
          //   url: 'https://uland.huimai88.com/r.html?redirect=' + res1.data.data, // 请将 url 替换为有效的页面地址
          //   success: (res) => {
             
          //   },
          //   fail: (err) => {
              
          //   }
          // });

        } else {


        }
      },
      fail(err) {
        reject(err)
      }
    })
  },
  // onShow(){
  //   let id = app.globalData.goodsId
  //   this.setData({
  //     id: id
  //   })
  //   this.getIdDetail()
  // },
  onLoad(query) {
   let id = app.globalData.goodsId
    this.setData({
      id: id
    })
    this.getIdDetail()


  },
});