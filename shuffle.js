// 1. 在原始数组中选取一个随机点
// 2. 随机点与原始数组最后一个交换( 原始数组 - 1 )
// 3. 重复至 index === 0

Array.prototype.shuffle = function (arr){
	function swap(arr, p1, p2) {
		var temp
		temp = arr[p1]
		arr[p1] = arr[p2]
		arr[p2] = temp
		return arr
	} 

	let time = this.length -1 
	for(let i of this){
		let point = Math.floor(Math.random() * time)
		console.log(point)
		swap(this, point, time)
		time--
	}
	return this
}
var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
console.log(a.shuffle())