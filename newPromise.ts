const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
interface IResolveObj {
  onFulfilled?: Function
  resolve: Function
}
// @ts-ignore
class Promise {
  status: string
  res: any
  resolvePool: IResolveObj[]
  constructor(fn) {
    this.status = PENDING
    // 1. 在这里类似 resolve 一样搞 reject
    this.resolvePool = []

    fn(this.resolve.bind(this))
  }
  resolve(value) {
    this.status = FULFILLED
    this.res = value

    setTimeout(() => {
      this.resolvePool.forEach(this.handle)
    }, 0)
  }
  handle(resolveObj: IResolveObj) {
    if (!resolveObj.onFulfilled) {
      resolveObj.resolve(this.res)
      return
    }
    // 2. 在这里 try catch 做错误处理, err 就跑目前这个 promise 的 onRejected
    const newValue = resolveObj.onFulfilled(this.res)
    resolveObj.resolve(newValue)
  }
  then(onFulfilled) {
    return new Promise((resolve) => {
      const resolveObj = { onFulfilled, resolve }
      if (this.status === PENDING) {
        this.resolvePool.push(resolveObj)
      } else {
        this.handle(resolveObj)
      }
    })
  }
}

new Promise(resolve => {
  resolve(3)
})
.then(res => {
  console.log(res)
  
  // @ts-ignore
  return res += 1
})
.then(res => {
  console.log(res)
  
  return res += 1
})