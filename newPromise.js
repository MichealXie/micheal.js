// function Promise(fn){
// 	var state = 'pending'
// 	var resolvedFns = []
// 	var rejectedFns = []
// 	function resolve(ret){
// 		// 万一 promise 内部为同步函数, 那么 then 里的方法还未注入, 强制 setTimeout 使之变为异步函数
// 		setTimeout( () => {
// 			state = 'resolved'
// 			resolvedFns.map( (fn) => {
// 				fn(ret)
// 			})
// 		}, 0)
// 	}
// 	function reject(ret) {
// 		setTimeout(() => {
// 			state = 'rejected'
// 			rejectedFns.map((fn) => {
// 				fn(ret)
// 			})
// 		}, 0)
// 	}
// 	this.then = function (resolved, rejected) {
// 		resolvedFns.push(resolved)
// 		rejectedFns.push(rejected)
// 		return this
// 	}
// 	fn(resolve, reject)
// }

// new Promise((resolve, reject) => {
// 	setTimeout(() => {
// 		if (Math.random() > 0.5) resolve('成功')
// 		else reject('错误')
// 	},1000)
// })
// .then( (ret) => {
// 	console.log(ret + 1)
// }, (ret) => {
// 	console.log(ret + 1)
// })
// .then( (ret) => {
// 	console.log(ret + 2)
// },(ret) => {
// 	console.log(ret + 2)
// })

function Promise(fn) {
	let status = 'pending'
	let resolvePool = []
	let rejectPool = []

	function resolve(res) {
		if (status === 'pending') {
			status = 'resolved'
			setTimeout(() => {
				try {
					resolvePool.map(fn => {
						fn(res)
					})
				} catch (err) {
					reject(err)
				}
			}, 0)
		}
	}

	function reject(err) {
		if (status === 'pending') {
			status = 'rejected'
			setTimeout(() => {
				rejectPool.map(fn => {
					fn(err)
				})		
			}, 0);
		}
	}

	this.then = function (resolve, reject) {
		if (typeof resolve !== 'function')  {
			resolve = res => res
		}
		if (typeof reject !== 'function') {
			reject = err => err
		}
		resolvePool.push(resolve)
		rejectPool.push(reject)
		return this
	}

	fn(resolve, reject)
}

new Promise((resolve, reject) => {
	console.log(1)
	resolve('first')
}).then(res => {
	setTimeout(() => {
		return 333
	}, 0);
}).then(res => {
	console.log(res)
})