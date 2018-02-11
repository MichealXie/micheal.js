function deepCopy(arr) {
	if (typeof arr !== 'object') return
	let newArr = Array.isArray(arr) ? [] : {}
	for (let key in arr) {
		if (typeof arr[key] === 'object') {
			newArr[key] = deepCopy(arr[key])
		}
		else[
			newArr[key] = arr[key]
		]
	}
	return newArr
}
var arr = [1, 2, [2, 3], function () { }, {
	name: 'micheal'
}]
var a = deepCopy(arr)
a[2][0] = 'x'
console.log(a)
console.log(arr)