//MVVM 核心代码

function observe(obj) {
	if (typeof obj !== 'object' || obj === null) return
	for (let key in obj) {
		let subject = new Subject()
		// 保存key 值
		let val = obj[key]
		Object.defineProperty(obj, key, {
			// 这两个默认都为 false....
			enumerable: true,
			configurable: true,
			get() {
				console.log(`get ${key}: ${val}`)
				if(currentObserver){
					currentObserver.subscribeTo(subject)
				}
				return val
			},
			set(newVal) {
				console.log('开始通知啦!')
				val = newVal
				subject.notify()
			}
		})
		// 递归观察
		if (typeof val === 'object') {
			observe(val)
		}
	}
}

let currentObserver = null
let id = 0

// 下面是发布订阅模式

class Subject{
	constructor(){
		this.id = id++
		this.observers = []
	}
	addObserver(fn){
		this.observers.push(fn)
	}
	removeObserver(fn){
		let index = this.observers.indexOf(fn)
		if(index >= 0){
			this.observers.splice(index, 1)
		}
	}
	notify(){
		this.observers.forEach( (item) => {
			// 每一个都需要有 update 方法, 或者本身能被 invoked
			item.update()
		})
	}
}

class Observer{
	constructor(vm,key, cb){
		this.subjects = {}
		this.vm = vm
		this.key = key
		this.cb = cb
		this.value = this.getValue()
	}
	// update 即取值
	update(){
		let oldVal = this.value
		// 取值, 触发 get
		let newVal = this.getValue()
		// 假如新旧值不等
		if (oldVal !== newVal) {
			this.value = newVal
			// 就得触发函数
			// get 订阅后更换 {{}} 里的data
			this.cb.bind(this.vm)(newVal, oldVal)
		}
	}
	subscribeTo(subject){
		if(!this.subjects[subject.id]){
			console.log(`增加订阅, id 是${subject.id}`)
			subject.addObserver(this)
			this.subjects[subject.id] = subject
		}
	}
	// 取出在 vm 里的值
	getValue(){
		currentObserver = this
		let value = this.vm.$data[this.key]
		currentObserver = null
		return value
	}
}

class MVVM{
	constructor(options){
		this.init(options)
		observe(this.$data)
		this.compile()
	}
	init(options){
		this.$el = document.querySelector(options.el)
		this.$data = options.data
		this.observers = []
	}
	compile(){
		this.traverse(this.$el)
	}
	traverse(node){
		// 当有子节点时
		if(node.nodeType === 1){
			node.childNodes.forEach( (childNode) => {
				this.traverse(childNode)
			})
		}
		// 当节点为文本
		if (node.nodeType === 3){
			this.renderText(node)
		}
	}
	renderText(node){
		let reg = /{{(.+?)}}/g
		let match
		// 一发现有匹配的小胡子, 马上替换为 data 里对应数据
		// 替换后再检测, 直到没有小胡子
		while (match = reg.exec(node.nodeValue)) {
			let raw = match[0]
			let key = match[1].trim()
			node.nodeValue = node.nodeValue.replace(raw, this.$data[key])
			// 有小胡子意味着数据更新需要被通知
			// 于是Observer会去 getValue, 值改变的话, 就 replace 掉他!!!
			new Observer(this, key, function (val, oldVal) {
				node.nodeValue = node.nodeValue.replace(oldVal, val)
			})
		}
	}
}

let vm = new MVVM({
	el: '#app',
	data: {
		name: 'micheal',
		age: 23
	}
})

setInterval(function () {
	vm.$data.age++
}, 1000)

