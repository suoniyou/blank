const countEndTime =(EndTimeMsg)=> {
  setInterval(() => {
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
    return countdown

  }, 1000)

}
export default{
  countEndTime
}