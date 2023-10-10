const app = getApp()
Component({
  mixins: [],
  data: {
 
  },
  props: {
    // 是否显示modal
    show: {
      type: Boolean,
      value: false
    },
    // 自定义标题
    title: {
      type: String,
      value: '提示'
    },
    // 是否显示取消按钮（默认显示）
    showCancelBtn: false,
    // 是否显示确认按钮（默认不显示）
    showOkBtn: false,
    showPhoneBtn: false,
    closeBtn:false,
    //取消按钮文子
    cancelText: '取消',
    //确认按钮文子
    okText: '确认',
    PhoneText: '确定',
    //取消按钮回调
    onCancel: {
      type: Function,
    },
    //确认按钮回调
    onOk: {
      type: Function,
    },
    //关闭按钮回调
    onClose: {
      type: Function,
    },
    modalHeight: ''
 
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    clickMask() {
      // 点击遮罩层关掉modal
      // this.setData({show: false})
    },
    //确认按钮回调
    onOk(e) {
      // this.setData({ show: false })
      this.props.onOk()
    },
    //取消按钮回调
    onCancel(e) {
      // this.setData({ show: false })
      this.props.onCancel()
    },
    onClose(){
      this.props.onClose()
    },
    onPhone(e) {
      this.props.onPhone()
    }
  },
});