import {
  getAdvertisement

} from '../api/home';
Page({
  data: {
    ImageArr:[]
  },
  goLink(e){
    let link = e.currentTarget.dataset.link
    console.log(link);
    my.ap.openURL({
      url: link, // 请将 url 替换为有效的页面地址
      success: (res) => {
        console.log('openURL success', res)
      },
      fail: (err) => {
        console.log('openURL success', err)
      }
    });

  },
  getAdvertisement(){
    getAdvertisement({cid:3}).then(res=>{
      if(res.code == 200){
          this.setData({
            ImageArr:res.data[3]
          })

      }
    })
  },
  onLoad() {
    this.getAdvertisement()
  },
});
