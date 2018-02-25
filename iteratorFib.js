let fib = {
	[Symbol.iterator]() {
		let n1 = 1, n2 = 1
		return {
			// 这一行不要也行???
			// [Symbol.iterator]() { return this },
			next() {
				var n3 = n1 + n2
				n1 = n2
				n2 = n3
				return {
					value: n3,
					done: false,
				}
			},
			return(v) {
				console.log('斐波那契完成!')
				return {
					value: v,
					done: true
				}
			}
		}
	}
}

for (let i of fib) {
	console.log(i)
	if (i > 50) break
}