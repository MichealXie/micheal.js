function binarySearch(arr, aim){
	var start = 0
	var end = arr.length - 1
	var mid 
	while(start < end){
		mid = Math.floor((start + end) / 2)
		if(mid === aim) return mid
		else if (arr[mid] < aim) start = mid + 1
		else end = mid - 1
	}
	return -1
}

console.log(binarySearch([0, 1, 2, 3, 4, 5, 6, 7, 8], 1))