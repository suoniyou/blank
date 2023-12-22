
Component({
  mixins: [],
  data: {
    // goodlist:{}
  },
  props: {
    goods: data =>  (data,'ss'),
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
    //    ('11111');
    //   my.ap.openURL({
    //     url: 'https://s.click.taobao.com/AbLFUCu',
    //     success: (res) => {
    //          ('openURL success', res)
    //          ('22222');
    //     },
    //     fail: (err) => {
    //          ('openURL success', err)
    //     }
    // });
     // this.$emit('goodsClick',this.goods)
  }
    
   
  },
});
