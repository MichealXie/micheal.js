
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