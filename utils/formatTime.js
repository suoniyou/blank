
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
 
  return days + ":" + hours + ": " + minutes + ": " + seconds;
}
export function countEndTime(EndTimeMsg){
  let timer = setInterval(() => {
    let h = Math.floor(EndTimeMsg / 60 / 60);
    let m = Math.floor((EndTimeMsg - h * 60 * 60) / 60);
    let s = Math.floor((EndTimeMsg - h * 60 * 60 - m * 60));
    // let aatime = parseInt(h / 24);
    let countdown =  h + ':' + m + ':' + s
    EndTimeMsg--;
    if (EndTimeMsg < 0) {
      countdown =  "00" + ':' +"00" + ':' + "00"
      // document.getElementById("DD").innerHTML = "0";
      // document.getElementById("HH").innerHTML = "00";
      // document.getElementById("MM").innerHTML = "00";
      // document.getElementById("SS").innerHTML = "00";;
    }
    clearInterval(timer)
    return countdown

  }, 1000)

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
};
// 使用 scheme 跳转小程序
export function navigateToMiniProgramScheme({ scheme,selfLoading, success, fail }) {
  var { params, message,selfLoading } = schemeToParams(scheme);
  if (params) {
    my.navigateTo({
      url:'/' + params.path + '?id=' + params.query.id,
    })
    selfLoading = false
    success && success( { selfLoading })
   //my.navigateToMiniProgram({ ...params, success, fail });
  } else {
    fail && fail({ error: -1, errorMessage: `无效的小程序 scheme ${scheme}: ${message}` });
  }
};
// 将 scheme 转换为 my.navigateToMiniProgram 的参数
function schemeToParams(scheme) {
  if (!scheme.startsWith('alipays:')) {
    return { message: '! 非 alipays: 开头' };
  }
  var params = {};
  var parseQuery = (str) => {
    return str.replace(/^.*?\?/, '').split('&').map(s => {
      var p = s.includes('=') ? s.indexOf('=') : s.length;
      return [s.slice(0, p), s.slice(p + 1)].map(decodeURIComponent);
    });
  };
  for (var [k, v] of parseQuery(scheme)) {
    if (k == 'appId') {
      if (v.length != 16) {
        return { message: `! 非 16 位 appId '${v}'` };
      }
    } else if (k == 'page') {
      k = 'path';
    } else if (k == 'query') {
      var o = {};
      for (var [x, y] of parseQuery(v)) {
        o[x] = y;
      }
      v = o;
    } else {
      return { message: `! 不支持参数 '${k}' ` };
    }
    params[k] = v;
    
  }
  return { params };
}
