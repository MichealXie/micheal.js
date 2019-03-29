function New(fn) {
  const res = {}
  return (...args) => {
    fn.call(res, ...args)

    return res
  }
}
