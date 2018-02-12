function createArr(length, item){
	var ret = Array.from({length: length})
	ret.fill(item)
	return ret
}
console.log(createArr(100,1))