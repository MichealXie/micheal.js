function throttle(fn, interval) {
  var timer;
  return () => {
    if (timer) return;
    else {
      timer = setTimeout(fn, interval);
      setTimeout(() => {
        timer = null;
      }, interval);
    }
  };
}
function _log() {
  console.log(1);
}
window.onscroll = throttle(_log, 500);
