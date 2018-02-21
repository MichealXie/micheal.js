function reduce(arr,fn, initialVal){
	// 不修改原数组, 创建副本
	var ret = arr.concat(initialVal === undefined ? [] : [initialVal] )
	while (ret.length > 1){
		// 减二加一
		ret.splice(0, 2, fn(ret[0], ret[1]))
	}
	return ret[0]
}

var newArr = reduce([1,2,3,4,5], (last, current) => {
	return last + current
},6)
console.log(newArr)