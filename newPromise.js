function Promise(fn){
	var state = 'pending'
	var resolvedFns = []
	var rejectedFns = []
	function resolve(ret){
		// 万一 promise 内部为同步函数, 那么 then 里的方法还未注入, 强制 setTimeout 使之变为异步函数
		setTimeout( () => {
			state = 'resolved'
			resolvedFns.map( (fn) => {
				fn(ret)
			})
		}, 0)
	}
	function reject(ret) {
		setTimeout(() => {
			state = 'rejected'
			rejectedFns.map((fn) => {
				fn(ret)
			})
		}, 0)
	}
	this.then = function (resolved, rejected) {
		resolvedFns.push(resolved)
		rejectedFns.push(rejected)
		return this
	}
	fn(resolve, reject)
}

new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() > 0.5) resolve('成功')
		else reject('错误')
	},1000)
})
.then( (ret) => {
	console.log(ret + 1)
}, (ret) => {
	console.log(ret + 1)
})
.then( (ret) => {
	console.log(ret + 2)
},(ret) => {
	console.log(ret + 2)
})