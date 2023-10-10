import {
  getAmount,
  getAccount,
  getVerifycode,
  bindMobile,
  doWithdraw
} from '../api/withdraw';
const base64 = require('../../utils/base64.js')
Page({
  data: {
    inputValue: '',
    amount: 0,
    alipayShow: "",
    show: false,
    verCodeBtn1: "获取验证码",
    verCodeBtn2: "获取验证码",
    verCodeBtn3: "获取验证码",
    editPhone: false, // true-修改手机号，false-绑定手机号
    mobile_new: '',
    verifycode: '',
    userPhone: '', //用户手机号
    accountId: '',
    result: '',
    loadCaptcha: false,
    captchaId: '',
    loadCaptcha1: false,
    loadCaptcha2: false
  },
  onInput(e) {
    let value = e.detail.value
    this.setData({
      inputValue: value
    })

  },
  getAmount1() {
    getAmount().then(res => {
      if (res.code == 200) {
        let phone = my.setStorageSync({
          key: 'phone',
          data: res.data.mobile
        })
        this.setData({
          amount: res.data.amount,
          phone: phone,
        })
      }

    })
  },
  onBindAccount() {
    my.navigateTo({
      url: '../accountList/accountList'
    })

  },
  getInput(e) {
    this.setData({
      mobile_new: e.detail.value
    })

  },
  getVerifycode(e) {
    this.setData({
      verifycode: e.detail.value
    })
  },
  getVerCode(e) {
    console.log(e);
    let phone = this.data.mobile_new || e.target.dataset.phone
    let n = e.target.dataset.index
    if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone)) {
      my.showToast({
        type: 'none',
        content: "请输入正确手机号",
        duration: 2000
      });
      return;
    }
    getVerifycode({
      mobile: phone,
      verifyresult: this.data.result
    }).then(res => {
      if (res.code == 200) {
        my.showToast({
          type: 'none',
          content: "发送成功",
          duration: 2000
        });
      } else {
        my.showToast({
          type: 'none',
          content: res.msg,
          duration: 2000
        });
        return
      }

      let t = 60;
      this.setData({
        ["verCodeBtn" + n]: "倒计时" + t + "s"
      })
      console.log(n, this.data["verCodeBtn" + n]);
      const interval = setInterval(() => {
        if (t > 0) {
          t--;
          this.setData({
            ["verCodeBtn" + n]: "倒计时" + t + "s"
          })
        } else {
          this.setData({
            ["verCodeBtn" + n]: "获取验证码"
          })

          clearInterval(interval);
        }
      }, 1000);
    })
  },
  getPhoneNumber() {
    my.getPhoneNumber({
      success: (res) => {
        let encryptedData = res.response;
        my.request({
          //你的服务器地址
          url: 'https://xxxxxxx',
          data: encryptedData,
        });
      },
      fail: (res) => {
        console.log(res);
      },
    })
  },
  //确认提现
  submitWithdraw() {
    if (
      !/^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/.test(
        this.data.inputValue
      )
    ) {
      my.showToast({
        type: 'none',
        content: "请填写正确的金额,最多两位小数！",
        duration: 2000
      });
      return;
    }
    if (!this.data.accountId) {
      my.showToast({
        type: 'none',
        content: "请先绑定收款账号！",
        duration: 2000
      });
      return;
    }
    if (!this.data.verifycode) {
      my.showToast({
        type: 'none',
        content: "请填写验证码！",
        duration: 2000
      });
      return;
    }
    let obj = {
      amount: this.data.inputValue,
      account: this.data.accountId,
      verifycode: this.data.verifycode
    }
    doWithdraw(obj).then(res => {
      my.showToast({
        type: 'none',
        content: "申请成功",
        duration: 2000
      });
      this.getAmount()
    })
  },
  getAccount() {
    getAccount().then(res => {
      if (res.code == 200) {
        if (res.data.detail) {
          this.setData({
            accountId: res.data.id,
            alipayShow: JSON.parse(res.data.detail).alipay
          })

        }
      }

    })
  },
  showBindPhone(e) {
    this.setData({
      editPhone: e.target.dataset.flag,
      show: true,
    })
    this.setData({
      loadCaptcha1: false
    })
    if (this.data.editPhone) {
      this.setData({
        loadCaptcha2: true
      })
    } else {
      this.setData({
        loadCaptcha: true
      })
    }

  },
  onSubmit(e) {
    let phoneData = e.detail.value
    console.log('phoneData', phoneData);
    if (!/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phoneData.mobile_new)) {
      my.showToast({
        type: 'none',
        content: "请输入正确手机号",
        duration: 2000
      });
      return;
    }
    if (!phoneData.verifycode) {
      my.showToast({
        type: 'none',
        content: "请输入验证码",
        duration: 2000
      });
      return;
    }

    bindMobile(phoneData).then(res => {
      if (res.code == 200) {
        my.showToast({
          type: 'none',
          content: "绑定成功",
          duration: 2000
        });
        this.setData({
          userPhone: phoneData.mobile_new
        })
        my.setStorageSync({
          'key': 'phone',
          data: this.data.userPhone
        })
        this.onReset()

      } else {
        my.showToast({
          type: 'none',
          content: res.msg,
          duration: 2000
        });
      }
    })

  },
  captchaSuccess: function (result) {
    let stringCode = JSON.stringify(result)
    this.setData({
      result: base64.encode(stringCode)
    })
    console.log(this.data.result, 'result');
  },
  captchaSuccess1: function (result) {
    let stringCode = JSON.stringify(result)
    this.setData({
      result: base64.encode(stringCode)
    })
  },
  captchaSuccess2: function (result) {
    let stringCode = JSON.stringify(result)
    this.setData({
      result: base64.encode(stringCode)
    })
  },
  onReset() {
    this.setData({
      show: false,
      loadCaptcha2: false,
      loadCaptcha1: true,
    })

  },
  onLoad(query) {
    console.log(query, '90');
    this.getAmount1()
    this.setData({
      captchaId: '8e89f401d4ce4dd72312165d6e3c7677',
      captchaId1: '871ce5182a0d2e1ca4c6538bc3c77a2c',
      captchaId2: '7ffd17f40685f8855ea632a650480a0c'
    })
    my.getStorage({
      key: 'phone',
      success: (res) => {
        if (res.success) {
          this.setData({
            userPhone: res.data,
            loadCaptcha1: true
          })
        } else {
          this.setData({
            loadCaptcha1: false
          })
        }
      }
    })

  },
  onShow() {
    this.getAccount()
  },


});