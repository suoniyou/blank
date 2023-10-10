import {
  getAccountlist,
  bindAccount,
  getDefaultAccount
} from '../api/withdraw';
Page({
  data: {
    list: [{
      detail: {},
      checked: 0,
    }],

    show: false


  },
  getAccountlist() {
    let that = this
    getAccountlist().then(res => {
      that.setData({
        list: res.data,
      })


      for (let a = 0; a < that.data.list.length; a++) {
        that.setData({
          ["list[" + a + "].detail"]: JSON.parse(res.data[a].detail)
        })
        if (that.data.list[a].is_default == 1) {
          that.setData({
            ["list[" + a + "].checked"]: res.data[a].id,
          })
        }

      }
    })
  },
  radioChange(e) {
     for (let i = 0; i < this.data.list.length; i++) {
        if (e.detail.value == this.data.list[i].id) {
          this.setData({
            ["list[" + i + "].checked"]: e.detail.value
          })
        }else{
          this.setData({
          ["list[" + i + "].checked"]: 0
          })
        }
        console.log(this.data.list[i].checked)
      }
      getDefaultAccount({id:e.detail.value}).then(res=>{
        if(res.code == 200){
          my.showToast({
            type: 'success',
            content: '修改成功',
            duration: 2000
          });
          
        }
        
      })

  },
  onBindAccount() {
    this.setData({
      show: true
    })

  },
  onReset() {
    this.setData({
      show: false
    })
  },
  onSubmit(e) {
    if (!e.detail.value.name) {
      my.showToast({
        type: 'none',
        content: "支付宝真实姓名不能为空",
        duration: 2000
      });
      return
    }
    if (!e.detail.value.alipay) {
      my.showToast({
        type: 'none',
        content: "支付宝账号不能为空",
        duration: 2000
      });
      return
    }
    bindAccount({
      type: "1",
      detail: e.detail.value
    }).then((res) => {
      if (res.code == 200) {
        my.showToast({
          type: 'success',
          content: '绑定成功',
          duration: 2000
        });
        this.setData({
          show: false
        })
        this.getAccountlist()

      } else {
        my.showToast({
          type: 'none',
          content: res.msg,
          duration: 2000
        });
      }


    }).catch(err => {
      console.log('err', err);
    })

  },
  onLoad() {
    this.getAccountlist()
  },
});