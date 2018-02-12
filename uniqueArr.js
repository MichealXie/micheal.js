// 数组去重

function uniqueArr(arr){
	return arr.filter( (e,i ) => {
		return arr.indexOf(e) === i
	})
}
function es6Unique(arr){
	return [... new Set(arr)]
}
var a = [1,2,3,4,1,2,3,4,5,6,7]
console.log(uniqueArr(a))
console.log(es6Unique(a))