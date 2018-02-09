// function Promise(???) {
//     ???
// 	return ???
// }

var promise = new Promise(function (x, y) {
	setTimeout(() => {
		// 把 101 传给了X, 也就是 resloved, 这就是为什么reslovedNotify能拿到 arguments
		// 使用者需要 resloved 结果, 传递给 reslovedNotify, 全体 then 使用一个 arguments
		x(101)
	}, 1000)
})
promise.then((z) => {
	console.log(z)  // 101
})




// 1. 输入一个函数
function Promise(fn){
	var state = 'pending',
	// 4. 执行结果保存在这里~
	reslovedArray = [],
	rejectedArray = [],
	// 5.这俩函数的作用是执行 then 里面的代码
	reslovedNotify = function () {
		this.state = 'resloved'
		for (let e of reslovedArray){
			e.apply(undefined, arguments)
		}
		// forEach 的话... this 会丢失
		// reslovedArray.forEach((e) => {
		// 	e.apply(undefined, arguments)
		// })
	}
	rejectedNotify = function () {
		this.state = 'rejected'
		rejectedArray.forEach( (e) => {
			e.apply(undefined, arguments)
		})
	}
	// 3. 执行传入的函数, 成功调用reslovedNotify, 失败调用rejectedNotify, 通知 then 里的函数执行, 这俩函数我们自己要实现
	fn.call(undefined, reslovedNotify, rejectedNotify)
	// 2. 返回一个 thenable 对象, 把用户在 then 里传入的函数放到队列中
	return{
		then(resolvedFn, rejectedFn) {
			reslovedArray.push(resolvedFn)
			rejectedArray.push(rejectedFn)			
			return undefined //简陋版...
		}
	}
}