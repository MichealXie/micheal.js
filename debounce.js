// 传入函数与间隔
function debounce(fn, interval, timeGap) {
  var prev;
  var timer;
  // 返回一个新函数
  return () => {
    clearTimeout(timer);
    var now = +new Date();
    if (!prev) prev = now;
    // 一直在执行操作...然后超过最大时间间隙的话, 主动执行一遍
    if ( ( now === prev ) || ( now - prev > timeGap ) ) {
      fn();
      prev = +new Date();
    } else {
      timer = setTimeout(fn, interval);
    }
  };
}

function _log() {
  console.log(1);
}
window.onscroll = debounce(_log, 500, 1000);
