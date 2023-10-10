Page({
  data: {
    timer: 3,
    failFlag:true
  },
  onPayTime() {

  },
  onLoad(query) {
    console.log(query.code,'query.code');
    if(query.code == 9000){
        this.setData({
          failFlag:false
        })
    }else{
      this.setData({
        failFlag:true
      })
    }
    console.log(this.data.failFlag,'failFlag');
    let t = 3
    let interval = setInterval(() => {
     this.setData({
        timer: t--
      })
    if (t == 0) {
        clearInterval(interval);
        my.switchTab({
          url:'/pages/index/index'
        })

      }


    }, 1000);



  },
});