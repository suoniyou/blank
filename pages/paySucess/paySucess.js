Page({
  data: {
    timer: 3,
    failFlag:true
  },
  onPayTime() {

  },
  onLoad(query) {
   
    if(query.code == 9000){
        this.setData({
          failFlag:false
        })
    }else{
      this.setData({
        failFlag:true
      })
    }

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