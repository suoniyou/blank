import {withdrawRecords} from '../api/withdraw' 
Page({
  data: {
    page:1,
    listData:[],
    totalPage:0
  },
  onReachBottom(){
    if(this.data.page >= this.data.totalPage || this.data.listData.length <= 0){
      return
   }
    this.setData({
      page: ++this.data.page
    })
  
    this.withdrawRecords(this.data.page)
    console.log(this.data.page,'1212');
  },
  withdrawRecords(page){
    withdrawRecords({p:page}).then(res=>{
      this.setData({
        listData:res.data,
        totalPage:res.data.totalpage
      })
    })
  },
  onLoad() {
    this.withdrawRecords()
  },
});
