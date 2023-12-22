
import {
  getGoodsZl,
  getformid
} from '../../../api/home';
Component({
  mixins: [],
  observers:true,
  data: {
    name: 'https://s.click.taobao.com/AbLFUCu',
    linkUrl: ''
  },
  props: {
    goodlist: data =>  (data, 'ss'),
    activeEnd:Boolean,
    current:Number
  },
 
  didMount() {

    //  this.$page.countDown = this
    //  this.countDown
  

    //this.setData({goodlist:this.props.goodlist})

  },
  didUpdate() {
  
  },
  didUnmount() {},
 
  methods: {
    getGoodsZls(id) {
      getGoodsZl({
        id: id,
        // tbs: 1
      }).then(res => {
        if (res.code == 200) {
          my.ap.openURL({
            url: 'https://uland.huimai88.com/r.html?redirect=' + res.data.coupon_click_url, // 请将 url 替换为有效的页面地址
            success: (res) => {
             
            },
            fail: (err) => {
              
            }
          });
          // my.navigateTo({
          //   url: '/pages/web/web?coupon_click_url=' + res.data.coupon_click_url
          // })

        }

        if (res.code == 102) {
      
          var res = my.getStorageSync({
            key: "token"
          })
          my.ap.openURL({
            url: 'https://uland.huimai88.com/r.html?redirect=' + encodeURIComponent('https://oauth.m.taobao.com/authorize?response_type=code&client_id=34030873&redirect_uri=https://test.huimai88.com/user/user/publisher&state=' + res.data), // 请将 url 替换为有效的页面地址
            success: (res) => {
             
            },
            fail: (err) => {
        
            }
          })

          // my.navigateTo({
          //   url: "/pages/web/web"
          // })
        }
      })
    },
 

    goodsClick() {
      my.ap.openURL({
        url: 'https://uland.huimai88.com/r.html?redirect=' + this.props.goodlist.coupon_click_url, // 请将 url 替换为有效的页面地址
        success: (res) => {
          
        },
        fail: (err) => {
  
        }
      });

      // my.navigateTo({
      //   url: '/pages/web/web?coupon_click_url=' + this.props.goodlist.coupon_click_url
      // })

    },
    onSubmit(e) {
      let id = e.detail.formId
     
      this.getformid(id)
    }, //返回formId值：MjA4ODYwMjAwMDY2MDQ2NF8xNTkzNTcyNTQ2NDI3Xzg2Nw==  }})
    getformid(id) {
      getformid({
        formid: id
      }).then(res => {
        if (res.code == 200) {}

      })
    },
    onSellOut(){
      // my.showToast({
      //   content:'已售罄'
      // })
    },
    goodsClicks(e) {
     
      const id = e.currentTarget.dataset.ids
      this.getGoodsZls(id)
      
    }


  },
});