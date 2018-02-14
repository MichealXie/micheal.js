
// 接受一个函数 与 一个数组参数
function curry(fn,argArr){
	if (!Array.isArray(argArr)){
		// 初始化
		argArr = []
	}
	// 返回一个函数
	return function(){
		var args = Array.from(arguments)
		if (argArr.concat(args).length < fn.length){
			// 一直传递参数
			return curry(fn, argArr.concat(args))
		}
		else{
			return fn.apply(undefined, argArr.concat(args))
		}
	}
}

function add(a, b, c) {
	return a + b + c
}
let foo = curry(add)
console.log(foo(2, 3)(4))

// ES6
// function curry(fn, thisArg) {
// 	if (!Array.isArray(thisArg)) {
// 		thisArg = []
// 	}
// 	return function (...args) {
// 		if (fn.length > (args.length + thisArg.length)) {
// 			return curry.call(undefined, fn, thisArg.concat(args))
// 		}
// 		else return fn.apply(this, thisArg.concat(args))
// 	}
// }

// function add(a, b, c) {
// 	return a + b + c
// }
// let foo = curry.call(undefined, add)
// console.log(foo(2)(3)(4))