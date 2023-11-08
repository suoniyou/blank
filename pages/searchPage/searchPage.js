import {
  getTaoSearch
} from '../api/searchPage';
Page({
  data: {
    loading: false,
    systemInfo: '',
    screenflag: false,
    showSort: false,
    changeColor: false,
    rotate: 'rotate(90deg)',
    searchList: [],
    inputValue: '',
    controlled: false,
    sortName: '',
    pageindex: 0,
    scrollTop: 0,
    searchfalg:false,
    
    sortsList: [{
        name: '综合',

      },
      {
        name: '销量降序',

      },
      {
        name: '价格升序',

      }, {
        name: '价格降序',

      }
    ],
    currindex: 0,
    list: [],
    totalPage: 0
  },
  onChange() {
    if (this.data.screenflag) {
      this.setData({
        screenflag: false
      })
    } else {
      this.setData({
        screenflag: true
      })
    }
    this.getTaoSearch(this.data.inputValue)

  },
  handleSearch(e) {
    this.setData({
      inputValue: e.detail.value,
    })

  },
  clearSearch() {
    this.setData({
      inputValue: '',
      searchfalg:false
    })

  },
  onSearch() {
    let arr = this.data.inputValue
    if (arr) {
      this.setData({
        searchfalg:true
      })
      this.getTaoSearch(arr)
    } else {
      my.showToast({
        type: 'none',
        content: '请输入搜索内容',
        duration: 2000
      })
    }
    // my.hideToast()

    if (arr.length > 5) {
      arr = arr.substring(0, 5) + '...'
    } else {
      arr = arr
    }
    let obj = {
      name: arr
    }
    if (this.data.searchList.length <= 9 && arr !== '') {
      this.data.searchList.push(obj)
      this.setData({
        searchList: this.data.searchList
      })
    }
    const arrlist = []
    for (let i of this.data.searchList) {
      const flag = arrlist.find((s) => s.name == i.name)
      if (!flag) {
        arrlist.push(i)
      }
    }
    this.setData({
      searchList: arrlist
    })
    if (this.data.searchList.length <= 9) {
      let res = my.setStorageSync({
        key: 'keyword',
        data: this.data.searchList
      })
      if (res.success) {
        console.log(res, 'keyword')
      }
    }

  },
  onDelate() {
    this.data.searchList = []
    this.setData({
      searchList: []
    })
    my.removeStorageSync({
      key: 'keyword',
    });
  },
  onKeyworde(e) {
    console.log(e);
    this.setData({
     inputValue: e.currentTarget.dataset.item,
      searchfalg:true
    })
    this.getTaoSearch(e.currentTarget.dataset.item)


  },
  onSelectMenu() {
    if (this.data.showSort) {
      this.setData({
        showSort: false,
        rotate: 'rotate(90deg)'
      })
    } else {
      this.setData({
        showSort: true,
        rotate: 'rotate(-90deg)'
      })
    }
  },
  onPriceSort(e) {
    console.log(e);
    const index = e.currentTarget.dataset.index
    this.setData({
      // rotate:'rotate(-90deg)',
      currindex: index,
      sortName: e.currentTarget.dataset.item
    })
    this.getTaoSearch(this.data.inputValue, index)


  },
  getTaoSearch(value, index, pageindex) {

    my.showLoading()
    let obj = {
      k: value,
      p: pageindex ? pageindex : 1,
      hascoupon: this.data.screenflag ? 1 : 0,
      sort: index
    }

    getTaoSearch(obj).then(res => {
      if (res.code == 200) {
        var that = this
        const items = res.data.map_data;
        if (obj.p === 1) {
          that.setData({
            list: items,
            totalPage: res.data.total_results - 1
          })

        } else {
          let newItems = JSON.parse(JSON.stringify(that.data.list))
          for (let i = 0; i < items.length; i++) {
            newItems.push(items[i])
          }
          that.setData({
            list: newItems
          })
        }
        console.log(that.data.list)


      }
      // if (res.code == 102) {
      //   my.navigateTo({
      //     url: "/pages/web/web"
      //   })
      // }

    })


    my.hideLoading();
  },
  lower() {
    // my.pageScrollTo({
    //   scrollTop: 100
    // })
    // const scrolltop = this.data.scrollTop - 50
    setTimeout(() => {
      const that = this
      that.setData({
        pageindex: that.data.pageindex += 1
      })
      const listLength = that.data.list.length
      console.log(that.data.pageindex, that.data.totalPage);
      if (that.data.pageindex <= that.data.totalPage && listLength < that.data.totalPage) {
        that.getTaoSearch(that.data.inputValue, that.data.currindex, that.data.pageindex)


      } else {
        my.showToast({
          type: 'none',
          content: '没有更多数据了',
          duration: 2000
        })
      }
    },300)

  },
  getSystemInfo() {
    my.getSystemInfo({
      success: (res) => {
        console.log(res, 'res');
        this.setData({
          systemInfo: res.screenHeight
        })
      }
    })
  },

  onLoad(query) {
    this.getSystemInfo()
    let res = my.getStorageSync({
      key: 'keyword'
    })
    if (res.success) {
      this.setData({
        searchList: res.data
      })
    }


    console.log(query);
    if (query.content) {
      this.setData({
        inputValue: query.content
      })
      this.getTaoSearch(query.content)
    }
    if (query.search) {
      this.setData({
        inputValue: query.search,
        searchfalg:true
      })
      this.getTaoSearch(query.search)
    }
    // my.ap.openURL({
    //   url: 'https://uland.huimai88.com/r.html', // 请将 url 替换为有效的页面地址
    //   success: (res) => {
    //     console.log('openURL success', res)
    //   },
    //   fail: (err) => {
    //     console.log('openURL success', err)
    //   }
    // });
    

  },


});