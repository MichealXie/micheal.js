//MVVM 核心代码

function observe(obj) {
	if (typeof obj !== 'object' || obj === null) return
	for (let key in obj) {
		let val = obj[key]
		// console.log(val)
		Object.defineProperty(obj, key, {
			// 这两个默认都为 false....
			enumerable: true,
			configurable: true,
			get() {
				console.log(`get ${val}`)
				return val
			},
			set(newVal) {
				console.log(`set ${val} to ${newVal}`)
				val = newVal
			}
		})
		if (typeof val === 'object') {
			observe(val)
		}
	}
}

let man = {
	name: "micheal",
	friend: {
		good: 'jared',
		nice: 'calbe',
		smart: 'wayne'
	},
	finger:[1,2,3,4,5]
}
observe(man)
man.finger