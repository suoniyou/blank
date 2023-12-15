import {
  getTaskList,
  getContractstate,
  getShareZL
} from '../api/pageShare';
import {
  preventDuplicateClicks
} from "../../utils/formatTime"
const app = getApp()
Page({
  data: {
    zylist: [],
    totalPage: 0,
    noProcuct: false,
    loading: false,
    scrollTop: 0,
    showpopop: false,
    showpopopImg: false,
    showpopopImg: false,
    codeImage: '',
    tempFilePath: "",
    signing: false, // 签约状态
    signingPopup: false,
    urlLink: '',
    shareText: '',
    shareImage: '',
    show_picture: '',
    default_ratio: '',
    pre_fee: '',
    sku_min_price: '',
    zy_goods_title: '',
    isloading: false,
    popupPic: ''
  },
  onProductDetail() {

  },
  getShareZL(taskid) {
    getShareZL({
      task_template_id: taskid
    }).then(res => {
      if (res.code == 200) {
        this.setData({
          shareText: res.data.guided_share_code,
          shareImage: res.data.guided_code_img,

        })

      }
    })
  },
  shareBtn(e) {
    let that = this
    if (!that.data.signing) {
      that.setData({
        signingPopup: true
      })
      return
    }
    my.showLoading({
      content: '加载中...',
      success: function (res) {
        that.setData({
          showpopop: true

        })
        let item = e.currentTarget.dataset.item
        let task_template_id = item.task_template_id
        that.getShareZL(task_template_id)
        that.setData({
          show_picture: item.show_picture,
          sku_min_price: item.sku_min_price,
          pre_fee: item.pre_fee,
          default_ratio: item.default_ratio,
          zy_goods_title: item.zy_goods_title

        })
        my.hideLoading();

      },
      fail: function (err) {
        console.log(err);
      }
    });





  },
  onclose() {
    this.setData({
      showpopop: false
    })
  },
  onSigningClose() {
    this.setData({
      signingPopup: false
    })
  },
  copyBtn() {
    my.setClipboard({
      text: this.data.shareText,
      success: function (res) {
        console.log(res, '复制成功');
      },
      fail: function (err) {
        console.log(err);
      },
    });
    my.getClipboard({
      success: function (res) {
        my.showToast({
          content: "复制成功",
          duration: 2000
        })
        console.log(res);
      },
      fail: function (err) {
        console.log(err);
      }
    });

  },
  getImage() {
    let token = my.getStorageSync({
      key: "token"
    })
    let that = this
    my.request({
      url: 'https://dyimg.huimai88.com/home/zhixin/picshare',
      method: 'POST',
      data: {
        show_picture: this.data.show_picture,
        sku_min_price: this.data.sku_min_price,
        zy_goods_title: this.data.zy_goods_title,
        guided_code_img: this.data.shareImage
      },
      headers: {
        'x-token': token.data, //默认值
      },

      success: function (res) {
        console.log(res);
        that.setData({
          showpopopImg: true,
          popupPic: res.data.data,
          isloading: false
        })
      },
      fail: function (error) {
        console.error('fail: ', JSON.stringify(error));
      }
    });

  },
  //生成图片
  saveImage() {
    this.setData({
      isloading: true
    })
    if (preventDuplicateClicks()) {
      return
    }
    this.getImage()

  },
  //暂时没有用到
  onCanvasReady() {
    let that = this
    my.createSelectorQuery().select('#canvas').node().exec((res) => {
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      // ctx.font = '26rpx sans-serif'
      // ctx.fillText('商品名称商品名称商品名称商品名称商品名称', 10, 320)
      // ctx.fillStyle = "#FE372B"
      // ctx.fillText('¥19', 10, 350)

      const img = canvas.createImage()
      img.src = this.data.popupPic
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 1200, 1700)
        canvas.toTempFilePath({
          x: 0,
          y: 0,
          width: 1200,
          height: 1700,
          destWidth: 1200,
          destHeight: 1700,
          success(res) {
            that.setData({
              tempFilePath: res.tempFilePath
            })
          },
        })
      }

    })

  },
  saveImagePhone() {
    let that = this
    // 网络地址图片
    my.saveImageToPhotosAlbum({
      filePath: that.data.popupPic,
      success(res) {
        that.setData({
          showpopopImg: false,
          isloading: false
        })
        console.log('saveImageToPhotosAlbum 调用成功', res);
      },
      fail(err) {
        console.log('saveImageToPhotosAlbum 调用失败', err);
        that.setData({
          showpopopImg: false,
          isloading: false
        })
        const platform = my.env.platform;
        if (err.error === 15) {
          // 提示用户开启相册权限
          if (platform === 'iOS') {
            my.showAuthGuide({
              authType: 'PHOTO',
              complete(res) {
                if (res.shown) {
                  console.log('已展示权限引导');
                } else {
                  console.error('保存图片失败: ', '请在系统设置中为支付宝并开启相册权限', JSON.stringify(err));
                }
              },
            });
          } else if (platform === 'Android') {
            console.error('保存图片失败: ', '请在系统设置找到支付宝应用并开启文件和多媒体写入权限', JSON.stringify(err));
          }
        }
      },
    });


  },
  goSign() {
    my.ap.openURL({
      url: 'https://uland.huimai88.com/r.html?redirect=' + encodeURIComponent(this.data.urlLink), // 请将 url 替换为有效的页面地址
      success: (res) => {
        console.log('openURL success', res)
      },
      fail: (err) => {
        console.log('openURL success', err)
      }
    });

  },
  getContractstate() {
    getContractstate().then(res => {
      if (res.code == 200 && res.data == 'SIGNED') {
        this.setData({
          signing: true
        })
      } else {
        this.setData({
          urlLink: res.data,
          signing: false
        })
      }
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

  },
  bindObjPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);

  },
  getTaskList(pageindex) {
    let obj = {
      p: pageindex ? pageindex : 1
    }
    getTaskList(obj).then(res => {
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
  onShow() {
 let options = my.getLaunchOptionsSync();
    let pathh = my.getStorageSync({
      key: "sharePagePath"
    })
    console.log('pathh', pathh.data);
    if (pathh.data == 1) {
      this.onSigningClose()
    }
  },
  onLoad() {
    let that = this

    this.getContractstate()
    this.getTaskList()

    my.setNavigationBar({
      frontColor: '#000000',
      backgroundColor: '#FFE100'
    })
  },
});