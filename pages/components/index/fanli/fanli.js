import {
  getGoodsZl,
  getformid
} from '../../../api/home'
Component({
  mixins: [],
  data: {
    name: 'https://s.click.taobao.com/AbLFUCu',
    linkUrl: ''
  },
  props: {
    goodlist: data => console.log(data, 'ss'),
    //   goodlist: {
    //     type: Object,
    //     default: () => {
    //         return {}
    //     }
    // }
  },
  didMount() {
    //this.setData({goodlist:this.props.goodlist})

  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getGoodsZls(id) {
      getGoodsZl({
        id: id,
        tbs: 1
      }).then(res => {
        if (res.code == 200) {
          my.navigateTo({
            url: '/pages/web/web?coupon_click_url=' + res.data.coupon_click_url
          })
        }

        if (res.code == 102) {
          my.navigateTo({
            url: "/pages/web/web"
          })
        }
      })
    },

    goodsClick() {
      my.navigateTo({
        url: '/pages/web/web?coupon_click_url=' + this.props.goodlist.coupon_click_url
      })

    },
    onSubmit(e) {
      let id = e.detail.formId
      console.log(e.detail.formId, 'formType="submit"')
      this.getformid(id)
    }, //返回formId值：MjA4ODYwMjAwMDY2MDQ2NF8xNTkzNTcyNTQ2NDI3Xzg2Nw==  }})
    getformid(id) {
      getformid({
        formid: id
      }).then(res => {
        if (res.code == 200) {}

      })
    },
    goodsClicks(e) {
      console.log(e)
      const id = e.currentTarget.dataset.ids
      this.getGoodsZls(id)





    }


  },
});