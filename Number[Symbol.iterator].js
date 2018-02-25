if (!Number.prototype[Symbol.iterator]){
	Object.defineProperty(Number.prototype, Symbol.iterator, {
		writable: true,
		configurable: true,
		enumerable: false,
		value: function iterator(){
			var i, inc, done = false, top = +this
			// 根据输入决定正负   inc 为增加的数值
			// i 为当前值
			inc = top > 0? 1 : -1

			return {
				[Symbol.iterator]() { return this},
				next(){
					// 还未完成就继续迭代
					if(!done){
						if( i === undefined) i = 0
						else if (top >= 0) i = Math.min(top, i + inc)
						else i = Math.max(top, i + inc)
						// 本次迭代后, 如果到达top, 完成迭代
						if( i == top) done = true
						
						return {value: i, done: false}
					}
					// 完成立马返回 done
					else return {value: undefined, done: true}
				}
			}
		}
	})
}
for (var i of 3) {
	console.log(i);
}
// 0 1 2 3

[...-3];