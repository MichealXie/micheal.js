// 输入this + 参数
Function.prototype.mybind = function(thisArg, ...rest){
	// 输出一个函数, 可附带参数
	return (...more) => {
		return this.call(thisArg, ...rest, ...more)
	}
}

function add(x, y, z, a, b, c) {
	return x + y + z + a + b + c
}

console.log(add.mybind(undefined, 1)(2,2,3,4,1))