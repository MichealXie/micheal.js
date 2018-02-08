// function Promise(???) {
//     ???
// 	return ???
// }

// var promise = new Promise(function (x, y) {
// 	setTimeout(() => {
// 		x(101)
// 	}, 3000)
// })
// promise.then((z) => {
// 	console.log(z)  // 101
// })




// 1. 输入一个函数
function Promise(fn){
	var state = 'pending',
	// 4. 执行结果保存在这里~
	reslovedArray = [],
	rejectedArray = [],
	// 这俩函数的作用是执行 then 里面的代码
	reslovedNotify = function () {
		this.state = 'resloved'
		reslovedArray.forEach(function(e){
			e.call()
		})
	}
	rejectedNotify = function () {
		this.state = 'rejected'
		rejectedArray.forEach(function (e) {
			e.call()
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