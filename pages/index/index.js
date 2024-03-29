
import {
  getGoodslist,
  getZYGoodsList,
  getRedBagLink,
  getGoodsNine,
  getSpecialGoods,
  getAdvertisement

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
    popdialog: [],
    minutetime: null,
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
    titleArr: ['低至0元', '9.9包邮'],
    current: 0,
    clipboardText2: '',
    pageindex: 1,
    totalPage: 0,
    scrollTop: Number,
    scrollHeight: Number,
    Verifyflag: false,
    failCopy: true,
    backBtn: false,
    bannerList: [],
    closeBtn: true,
    countdown: '',
    activeEnd:false
  },
  clearSearch11() {
    this.setData({
      search: ''
    })

  },
  goodsClicks(ref){
    //  (ref);
    this.BuyNow = ref
  },
  onBuyNow(e){
   //let id = e.currentTarget.dataset.ids
   this.BuyNow.goodsClicks(e)

  },
  testy(val){
    // (val,'父组件');
    if(val == "00:00:00"){
      this.setData({
        activeEnd:true
      })

    }else{
      this.setData({
        activeEnd:false
      })
    }
    
  },
  waySelectClick(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      pageindex: 1,

    })
    if (index == 0) {
      this.getSpecialGoods()
    }
    //if (index == 1) this.getGoodslist1()
    if (index == 1) this.getGoodsNine()
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
        // 加载完列表之后滚动头条回退50以触发下拉事件
        my.pageScrollTo({
          scrollTop: this.data.scrollTop - 50
        })


      }

    })
  },
  getSpecialGoods(pageindex) {
    let obj = {
      p: pageindex ? pageindex : 1,
      platform: 2
    }
    getSpecialGoods(obj).then(res => {
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
    
        // 加载完列表之后滚动头条回退50以触发下拉事件
        my.pageScrollTo({
          scrollTop: this.data.scrollTop - 50
        })


      }

    })
  },
  // 截取 ;之后的url
  getUrlParameter(url, name) {
    const regex = new RegExp(`[;&]${name}=([^&]*)`);
    const result = regex.exec(url);
    return result && result[1];
  },
  oneleBag(e) {
    let link = e.currentTarget.dataset.link
    if (this.checkLink(link)) {
      my.navigateTo({
        url: '/pages/web/web?linkurl=' + link
      })
    } else {
      let uri = this.getUrlParameter(link, 'page')
      const url = decodeURIComponent(uri)
      my.navigateToMiniProgram({
        appId: '2021001110676437', // 16 位
        path: url,
        success: function (res) {
          
        },
        fail: function (err) {
          
        }
      });
    }


    // getRedBagLink().then(res => {
    //   if (res.code == 200) {
    //     let uri = this.getUrlParameter(res.data, 'page')
    //     const url = decodeURIComponent(uri)
    //     my.navigateToMiniProgram({
    //       appId: '2021001110676437', // 16 位
    //       path: url,
    //       success: function (res) {
    //             
    //       },
    //       fail: function (err) {
    //            
    //       }
    //     });

    //   }
    // })
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
          // for (let i = 0; i < items.length; i++) {
          //    newItems.push(items[i])
          // }
          let arrs = newItems.concat(items)
          this.setData({
            list: arrs,
            loading: false
          })
          // 加载完列表之后滚动头条回退50以触发下拉事件
          my.pageScrollTo({
            scrollTop: this.data.scrollTop - 50
          })

        }


      }
      // if (res.code == 102) {
      //   my.navigateTo({
      //     url: "/pages/web/web"
      //   })
      // }

    })
  },

  handleSearch(e) {
    this.setData({
      search: e.detail.value,
    });
  },
  ceshi() {
    my.navigateTo({
      url: '/pages/searchPage/searchPage'
    })

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
          // show: true,
          isProductLink: true,
        })

      }

      // if (res.code == 102) {
      //   my.navigateTo({
      //     url: "/pages/web/web"
      //   })
      // }
      my.setClipboard({
        text: ''
      });
      this.setData({
        clipboardText: ''
      })
      my.hideLoading()




    })
  },
  onCloseLink() {
    this.setData({
      isProductLink: false

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
    var nextDate = new Date().toLocaleDateString();
   
    my.setStorageSync({
      key: "advertimer",
      data: nextDate
    })

  },

  lower() {
    my.pageScrollTo({
      scrollTop: 500
    })
    const that = this
    that.setData({
      loading: true
    })
    that.data.pageindex++
    const listLength = that.data.list.length
    if (that.data.pageindex * 10 < that.data.totalPage) {

      if (that.data.current == 0) {
        that.getSpecialGoods(that.data.pageindex)


        return
      }
      // if (that.data.current == 1) {
      //   that.getGoodslist1(that.data.pageindex)

      //   return
      // } 
      else {
        that.getGoodsNine(that.data.pageindex)
      }


    } else {
      this.setData({
        loading: false
      })
      my.showToast({
        type: 'none',
        content: '没有更多数据了',
        duration: 2000
      })
    }

  },
  onPopLink() {
    let link = this.data.popdialog[0].link
    if (this.checkLink(link)) {
      my.navigateTo({
        url: '/pages/web/web?linkurl=' + link
      })
    } else {
      let uri = this.getUrlParameter(link, 'page')
      const url = decodeURIComponent(uri)
      my.navigateToMiniProgram({
        appId: '2021001110676437', // 16 位
        path: url,
        success: function (res) {
          
        },
        fail: function (err) {
           
        }
      });
    }

  },

  getAdvertisement() {
    getAdvertisement({
      cid: "1-2"
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          bannerList: res.data[1],
          popdialog: res.data[2]
        })
        if (!this.data.popdialog && typeof (this.data.popdialog) == "undefined") {
          this.setData({
            show: false
          })
        } else {
          var curDate = new Date().toLocaleDateString();
          let timer = my.getStorageSync({
            key: "advertimer"
          })
          //  (curDate,timer.data); 
          if (timer.data == null || curDate != timer.data) {
            this.setData({
              show: true
            })
          }

        }
      }
    })

  },

  onLoad(query) {

    let token = my.getStorageSync({
      key: "token"
    })
    //第一次进首页须先请求token再请求接口
    app.tokenObtainedCallback = () => {
    this.getSpecialGoods()

    };
    if(token.data){
      this.getSpecialGoods()//有token
    }
 
    let code1 = my.getStorageSync({
      key: "code1"
    })
    //  (code1.data);
    if (code1.data == null) {
      this.setData({
        Verifyflag: true
      })
    } else if (code1.data == 1) {
      this.setData({
        Verifyflag: true
      })
    }
    this.getAdvertisement()

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
           
        my.setClipboard({
          text: ''
        });
        if (err.error == 30 || err.error == 2001 || err.error == 2002 || err.error == 2003) {
          my.getServerTime({
            success: (res) => {
              let timer = res.time
              my.setStorageSync({
                key: "failtimer",
                data: timer
              })

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
  diaplayTime() {
    var minute = 1000 * 60;
    var timer = my.getStorageSync({
      key: "failtimer"
    }) // 拒绝授权的时间戳
    var now = new Date();
    var curtime = now.getTime()
    if (timer.data != null) {
      var diffValue = curtime - timer.data;
    }

     (diffValue, 'diffValue')
    if (diffValue < 0) {
      return;
    }
    var minC = diffValue / minute;
    
    if (minC > 0) {
      this.setData({
        minutetime: parseInt(minC)
      })
    }

  },
  onBackTop() {
    my.pageScrollTo({
      scrollTop: 50,
      duration: 100
    })
  },

  onShow() {
    this.diaplayTime()

    if (this.data.minutetime == null || this.data.minutetime > 15) {
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
  onPageScroll({
    scrollHeight,
    scrollTop
  }) {
    this.setData({
      scrollTop: scrollTop,
      scrollHeight: scrollHeight
    })
  },
  onReachBottom() {
    var that = this
    that.setData({
      backBtn: true,
      loading: true
    })
    that.data.pageindex++
    const listLength = that.data.list.length
    if (listLength < 10) {
      that.setData({
        // noProcuct: true,
        loading: false
      })
      return
    }
    if (that.data.pageindex * 10 < that.data.totalPage) {

      if (that.data.current == 0) {
        that.getSpecialGoods(that.data.pageindex)
        return
      }
      // if (that.data.current == 1) {
      //   that.getGoodslist1(that.data.pageindex)

      //   return
      // } 
      else {
        that.getGoodsNine(that.data.pageindex)
      }


    } else {
      this.setData({
        loading: false,
        noProcuct: true
      })
      my.showToast({
        type: 'none',
        content: '没有更多数据了',
        duration: 2000
      })
    }

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