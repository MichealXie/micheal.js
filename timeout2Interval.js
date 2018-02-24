function myInterval(fn, time){
	function foo(){
		fn()
		setTimeout(foo, time)
	}
	setTimeout(foo, time)
}

myInterval(() => {
	console.log('heihei')
}, 1000)