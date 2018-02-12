function es6Flatten(arr){
	while (arr.some( e => Array.isArray(e) )){
		arr = [].concat(...arr)
	}
	return arr
}

function flatten(arr){
	let ret = []
	for(let e of arr){
		if(Array.isArray(e)){
			ret = ret.concat(flatten(e))
		}
		else{
			ret.push(e)
		}
	}
	return ret
}

var arr = [1, [2, [3, [4]]]]
console.log(flatten(arr))