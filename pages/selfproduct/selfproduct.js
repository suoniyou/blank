import {
  getZYGoodsList,
} from '../api/home';
Page({
  data: {
    zylist: [],
    totalPage: 0,
    noProcuct: false,
    loading: false,
    scrollTop:0
  },
  getZYGoodsList(pageindex) {
    let obj = {
      p: pageindex ? pageindex : 1
    }
    getZYGoodsList(obj).then(res => {
      if (res.code == 200) {
        const items = res.data;

        if (obj.p === 1) {
          this.setData({
              zylist: items,
              // totalPage: res.page.totalnum
            }

          )

        } else {
          let newItems = JSON.parse(JSON.stringify(this.data.zylist))
          let arrs = newItems.concat(items)
          this.setData({
            zylist: arrs,
            loading: false
          })
            // 加载完列表之后滚动头条回退50以触发下拉事件
            my.pageScrollTo({
              scrollTop: this.data.scrollTop - 50
            })


        }
      }





    })
  },
  onPageScroll({
 scrollTop
  }) {
    this.setData({
      scrollTop: scrollTop,

    })
  },
  onProductDetail(e) {
    const id = e.currentTarget.dataset.ids
    my.navigateTo({
      url: "/pages/productDetail/productDetail?id=" + id
    })
  },
  onLoad() {
    this.getZYGoodsList()
  },
  onReachBottom() {
    var that = this
    that.setData({
      loading: true
    })
    that.data.pageindex++
    const listLength = that.data.zylist.length
    if (listLength < 10) {
      that.setData({
        // noProcuct: true,
        loading: false
      })
      return
    }
    if (that.data.pageindex * 10 < that.data.totalPage) {

      if (that.data.current == 0) {
        that.getZYGoodsList(that.data.pageindex)

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
});