Component({
  mixins: [],
  options: {
    relations: true,
    additive: true,
    lifetimes: true,
    //observers:true
  },
  data: {
    endDate: '1702965280449',
    countdown: '',
    timer:''

  },
  lifetimes: {
  
  },


  props: {
    itemtime:'',
    onCounterPlusOne:data =>  (data, 'countdown'),
  },
  observers:{
    'countdown'(newval){
       (newval);
    

    }
  },
  didMount() {
    let that = this
   // that.countTime(); // 页面加载时立即调用一次 countTime 函数
    that.setData({
      timer: setInterval(function () {
        that.countTime(); // 每秒调用一次 countTime 函数，更新倒计时
      }, 1000)
    });
  
  },
  didUpdate() {},
  didUnmount() {
    clearInterval(this.data.timer);
  },
  methods: {
   
    countTime() {
      var that = this;
      var date = new Date().getTime();
      var endDate = that.props.itemtime * 1000;
      var leftTime = endDate - date; // 计算剩余时间（毫秒）
      //  (date,endDate,leftTime,'leftTime');
      if (leftTime >= 0) {
       // var d = Math.floor(leftTime / (24 * 3600 * 1000)); // 天数
        var h = Math.floor((leftTime % (24 * 3600 * 1000)) / (3600 * 1000)); // 小时
        var m = Math.floor((leftTime % (3600 * 1000)) / (60 * 1000)); // 分钟
        var s = Math.floor((leftTime % (60 * 1000)) / 1000); // 秒数

        that.setData({
          countdown: (h >= 10 ? h : '0' + h) + ':' + (m >= 10 ? m : '0' + m) + ':' + (s >= 10 ? s : '0' + s)
        });
      } else {
        // my.setStorageSync({ key: 'IntervalTime',data:that.data.countdown});//后端最好返回倒计时结束的标识
        clearInterval(that.data.timer); // 时间结束，清除定时器
        that.setData({
          countdown: '00:00:00'
        });

      }
      that.props.onCounterPlusOne(that.data.countdown) //子组件传值给父组件
    },

  },
});