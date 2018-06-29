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



let _throttle = (fn, delay) => {
  let now, lastExec, timer, context //eslint-disable-line

  let execute = () => {
    fn.apply(context)
    lastExec = now
  }

  return () => {
    context = this

    now = Date.now()

    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    if (lastExec) {
      let diff = delay - (now - lastExec)

      if (diff < 0) {
        execute()
      } else {
        timer = setTimeout(() => {
          execute()
        }, diff)
      }
    } else {
      execute()
    }
  }
}
function _log() {
  console.log(1);
}
function __log() {
  console.log(2);
}
window.addEventListener('scroll',_throttle(_log, 500))
window.addEventListener('scroll',_throttle(__log, 500))
