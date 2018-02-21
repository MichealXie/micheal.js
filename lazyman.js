class lazyman{
	constructor(name){
		this.name = name
		console.log('你好, 我是' + name)
		this.tasks = []
		setTimeout( () => {
			this.next()
		}, 0)
		return this
	}
	next(){
		if (this.tasks.length){
			let fn = this.tasks.shift()
			fn()
			// 踩坑... 先执行后删除, 然而执行会 push, 无限循环
			// this.tasks[0]()
			// this.tasks.shift()
		}
	}
	eat(meal){
		let fn = () => {
			console.log('吃' + meal)
			this.next()
		}
		this.tasks.push(fn)
		return this
	}
	sleep(time){
		var fn = () => {
			console.log('睡了' + time + '秒')
			this.next()
		}
		this.tasks.push(() =>{
			setTimeout(fn, time * 1000)
		})
		return this
	}
	sleepFirst(time){
		var fn = () => {
			console.log('早早睡了' + time + '秒')
			this.next()
		}
		this.tasks.unshift(() => {
			setTimeout(fn, time * 1000)
		})
		return this
	}
}
var a = new lazyman('Hank').sleep(1).eat('早餐').sleepFirst(1).eat('晚餐')