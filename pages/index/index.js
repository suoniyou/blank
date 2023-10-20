import {
  getGoodslist,
  getZYGoodsList,
  getRedBagLink,
  getGoodsNine,
  getGoodsKol

} from '../api/home';
import {
  getCreditagreementt,
  getVerify
} from '../api/withdraw';
import {
  getTaoSearch
} from '../api/searchPage';
const app = getApp()
Page({
  data: {
    minutetime:null,
    noProcuct: false,
    zylist: [],
    loading: false,
    isReady: false,
    snum: 99,
    waySelect: 1,
    list: [],
    goodsList: [],
    clipboardText: '',
    show: false,
    isProductLink: false,
    productObj: {},
    search: '',
    titleArr: ['精选优惠', '9.9包邮', '主播推荐'],
    current: 0,
    clipboardText2: '',
    pageindex: 1,
    totalPage: 0,
    scrollTop: 0,
    Verifyflag: false,
    failCopy: true
  },
  clearSearch11() {
    this.setData({
      search: ''
    })

  },
  waySelectClick(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      pageindex: 1
    })
    if (index == 0) {
      this.getZYGoodsList(), this.getGoodslist1()
    }
    if (index == 1) this.getGoodsNine()
    if (index == 2) this.getGoodsKol()
    this.setData({
      current: index
    })

  },
  goQkt() {
    getCreditagreementt().then(res => {
      if (res.code == 200) {
        if (res.data) {
          my.navigateTo({
            url: '/pages/web/web?authUrl=' + res.data
          })
        }
      }

    })
  },
  getVerifyStstus() {
    getVerify().then(res => {
      if (res.code == 200) {
        if (res.data == 1) {
          app.globalData.Verifyflag = true
          this.setData({
            Verifyflag: app.globalData.Verifyflag
          })
          console.log(app.globalData.Verifyflag, 'app.globalData.Verifyflag');
          console.log(this.data.Verifyflag, 'Verifyflag');

        }
      }
    })

  },
  getGoodsNine(pageindex) {
    let obj = {
      p: pageindex ? pageindex : 1,
    }
    getGoodsNine(obj).then(res => {
      if (res.code == 200) {
        const items = res.data;
        let page = res.page
        if (obj.p === 1) {
          this.setData({
            list: items,
            totalPage: page.totalnum

          })
        } else {
          let newItems = JSON.parse(JSON.stringify(this.data.list))
          for (let i = 0; i < items.length; i++) {
            newItems.push(items[i])
          }
          this.setData({
            list: newItems,
            loading: false
          })

        }

      }

    })
  },
  getGoodsKol(pageindex) {
    console.log(pageindex);
    let obj = {
      p: pageindex ? pageindex : 1,
    }
    getGoodsKol(obj).then(res => {
      if (res.code == 200) {
        const items = res.data;
        let page = res.page
        if (obj.p === 1) {
          this.setData({
            list: items,
            totalPage: page.totalnum

          })
        } else {
          let newItems = JSON.parse(JSON.stringify(this.data.list))
          for (let i = 0; i < items.length; i++) {
            newItems.push(items[i])
          }
          // var list = this.data.list;
          // list = list.concat(newItems) 
          this.setData({
            list: newItems,
            loading: false
          })

        }

      }

    })
  },
  // 截取 ;之后的url
  getUrlParameter(url, name) {
    const regex = new RegExp(`[;&]${name}=([^&]*)`);
    const result = regex.exec(url);
    return result && result[1];
  },
  oneleBag() {
    getRedBagLink().then(res => {
      if (res.code == 200) {
        let uri = this.getUrlParameter(res.data, 'page')
        const url = decodeURIComponent(uri)
        my.navigateToMiniProgram({
          appId: '2021001110676437', // 16 位
          path: url,
          success: function (res) {
            console.log(res);
          },
          fail: function (err) {
            console.log(err);
          }
        });

      }
    })
  },
  onRedBag() {
    my.showToast({
      type: 'none',
      content: "功能待开放",
      duration: 2000
    })
  },
  onGuess() {

    // console.log(world,'world')
    // my.navigateTo({
    //   url: 'plugin://likes/likes',
    // });
  },
  onGoBuy() {
    my.navigateTo({
      url: '/pages/web/web?coupon_click_url=' + this.data.productObj.coupon_click_url
    })

  },
  // getSpecialGoods1() {
  //   getSpecialGoods({
  //     p: 1,
  //     platform: 2
  //   }).then(res => {
  //     this.setData({
  //         list: res.data
  //       }

  //     )
  //   })
  // },
  getZYGoodsList() {
    getZYGoodsList().then(res => {
      if (res.code == 200) {
        this.setData({
            zylist: res.data
          }

        )
        // this.data.list = this.data.list.concat(this.zylist)
      }
    })
  },
  onProductDetail(e) {
    const id = e.currentTarget.dataset.ids
    my.navigateTo({
      url: "/pages/productDetail/productDetail?id=" + id
    })
  },
  getGoodslist1(pageindex) {
    let obj = {
      p: pageindex ? pageindex : 1,
      platform: 2
    }

    getGoodslist(obj).then(res => {
      if (res.code == 200) {
        const items = res.data;
        let page = res.page
        if (obj.p === 1) {
          this.setData({
            list: items,
            totalPage: page.totalnum

          })
        } else {
          let newItems = JSON.parse(JSON.stringify(this.data.list))
          for (let i = 0; i < items.length; i++) {
             newItems.push(items[i])
          }
          this.setData({
            list: newItems,
            loading: false
          })

        }

        // if (this.data.list <= 0) {
        //   this.setData({
        //     noProcuct: true
        //   })
        // }
     
      }
      if (res.code == 102) {
        my.navigateTo({
          url: "/pages/web/web"
        })
      }

    })
  },

  handleSearch(e) {
    console.log('search', e.detail.value);
    this.setData({
      search: e.detail.value,
    });
  },

  clearSearch() {
    my.navigateTo({
      url: '/pages/searchPage/searchPage?search=' + this.data.search
    })
  },
  onJumpSearch() {
    my.navigateTo({
      url: '/pages/searchPage/searchPage?content=' + this.data.clipboardText
    })
  },
  getLinkProduct() {

    let obj = {
      k: this.data.clipboardText,
    }
    getTaoSearch(obj).then(res => {
      if (res.code == 200) {
        my.showLoading({
          content: '加载中',
          delay: 500
        })
        this.setData({
          productObj: res.data,
          show: true,
          isProductLink: true,
        })

      }

      if (res.code == 102) {
        my.navigateTo({
          url: "/pages/web/web"
        })
      }
      my.setClipboard({
        text: ''
      });
      this.setData({
        clipboardText: ''
      })
      my.hideLoading()




    })
  },
  onClose() {
    my.setClipboard({
      text: ''
    });
    this.setData({
      show: false,
      clipboardText: ''

    })
  },
  lower() {
    // my.pageScrollTo({
    //   scrollTop: 500
    // })
    const that = this
    that.setData({
      loading: true,
      pageindex: that.data.pageindex + 1
    })
    const listLength = that.data.list.length
    console.log(that.data.pageindex, that.data.totalPage);
    if (that.data.pageindex <= that.data.totalPage && listLength < that.data.totalPage) {
      if (that.data.current == 0) {
        that.getGoodslist1(that.data.pageindex)

        return
      }
      if (that.data.current == 1) {
        that.getGoodsNine(that.data.pageindex)
        return
      } else {
        that.getGoodsKol(that.data.pageindex)
      }


    } else {
      this.setData({
        noProcuct: true
      })
     my.showToast({
        type: 'none',
        content: '没有更多数据了',
        duration: 2000
      })
    }

  },

  onLoad(query) {
    app.tokenObtainedCallback = () => {
      this.getGoodslist1()
      this.getZYGoodsList()
    };
    this.getVerifyStstus()
    my.setNavigationBar({
      frontColor: '#000000',
      backgroundColor: '#FFE100'
    })


  },
  navToPluginPage() {
    // 跳转到插件页面，hello为插件plugin.json中对外暴露的页面
    my.navigateTo({
      url: 'dynamic-plugin://2021001131694653/hello',
    });
  },
  onReady() {
    // 页面加载完成


  },
  checkLink(str) {
    var reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(reg);
    if (objExp.test(str) == true) {
      return true;
    } else {
      return false;
    }

  },
  //读取剪切板
  readClipboard() {
    var that = this
    my.getClipboard({
      success: function (res) {
        that.setData({
          clipboardText: res.text
        })

        if (that.data.clipboardText != '') {
          if (that.checkLink(that.data.clipboardText)) {
            that.getLinkProduct()

          } else {
            // if (that.data.clipboardText.length >= 20) {
            //   that.setData({
            //     show: true,
            //     isProductLink: false
            //   })

            // } else {
            //   that.setData({
            //     show: false
            //   })
            // }


          }

        }


      },
      fail: function (err) {
        console.log(err);
        my.setClipboard({
          text: ''
        });
        if (err.error == 30 || err.error == 2001 || err.error == 2002 || err.error == 2003) {
          my.getServerTime({
            success: (res) => {
              let timer = res.time
              my.setStorageSync({key:"failtimer",data:timer})
      
            }
         })
           

        }



      }


    })

  },
  // countDown(){
  //   let count = 900
  //    var timee = setInterval(() => {
  //     count--
  //     if (count == 0) {
  //       this.readClipboard()
  //       clearInterval(timee)
  //     }
  //     my.setStorageSync({
  //       key:"countdown",
  //       data:count
  //     })
  //   }, 1000)
 
  // },
  diaplayTime(){
    var minute = 1000 * 60;
    var timer = my.getStorageSync({ key:"failtimer"}) // 拒绝授权的时间戳
    console.log(timer.data,'timer');
    var now = new Date();
    var curtime = now.getTime()
    console.log(curtime,'curtime');
    if(timer.data != null){
      var diffValue = curtime - timer.data;
    }
   
     console.log(diffValue,'diffValue') 
    if(diffValue < 0){
      return;
    }
    var minC =diffValue/minute;
    console.log(minC,'minC') 
    if(minC > 0){
      this.setData({
        minutetime:parseInt(minC)
      })
    }
     
    
    


    
    

  },
  onShow() {
    this.diaplayTime()
    console.log(this.data.minutetime,'result');
   
    if(this.data.minutetime == null || this.data.minutetime > 15){
      this.readClipboard()
    }
   
 },
  onHide() {

  },
  onUnload() {

    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '福利鸭',
      desc: '购物领券拿返利，90%商品都可返',
      path: 'pages/index/index',
    };
  },
});