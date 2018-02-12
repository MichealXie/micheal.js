function es6FindMax(arr){
	return Math.max(...arr)
}
function findMax(arr){
	return arr.reduce( (last, current) => {
		return Math.max(last, current)
	})
}
var a = [1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7]
console.log(findMax(a))