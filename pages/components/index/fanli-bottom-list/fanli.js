
Component({
  mixins: [],
  data: {
    // goodlist:{}
  },
  props: {
    goods: data => console.log(data,'ss'),
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
    goodsClick(){
      my.navigateTo({
        url:'/pages/web/web?index=1'
      })
    //   console.log('11111');
    //   my.ap.openURL({
    //     url: 'https://s.click.taobao.com/AbLFUCu',
    //     success: (res) => {
    //         console.log('openURL success', res)
    //         console.log('22222');
    //     },
    //     fail: (err) => {
    //         console.log('openURL success', err)
    //     }
    // });
     // this.$emit('goodsClick',this.goods)
  }
    
   
  },
});
