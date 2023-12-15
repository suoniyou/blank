
//把毫秒数转化成具体日期   2021-06-04 00:00:00
//参数 毫秒数  
export function formatMsToDate(ms) {
  if (ms) {
    var oDate = new Date(ms),
      oYear = oDate.getFullYear(),
      oMonth = oDate.getMonth() + 1,
      oDay = oDate.getDate(),
      oHour = oDate.getHours(),
      oMin = oDate.getMinutes(),
      oSen = oDate.getSeconds(),
      oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' +
      addZero(oMin) + ':' + addZero(oSen);
    return oTime;
  } else {
    return ""
  }

}
//该方法用于给日期、时间补零

function addZero(num) {
  if (parseInt(num) < 10) {
    num = "0" + num
  }
  return num
}
// 毫秒数转化成时分秒
export function formatTim1(milliseconds) {
  var seconds = Math.floor(milliseconds / 1000) % 60;
  var minutes = Math.floor(milliseconds / (1000 * 60)) % 60;
  var hours = Math.floor(milliseconds / (1000 * 60 * 60)) % 24;
  var days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
 
  return days + "天 " + hours + "小时 " + minutes + "分钟 " + seconds + "秒";
}
/*w防止重复点击 */
//点击防重
let isClick=false;
export function preventDuplicateClicks(){
  if (!isClick) {
    isClick=true    
    setTimeout(function () {
      isClick = false
    }, 1000);
    return false;
  } else {
    return true;
  }
}
