function traverseNodes(selector){
	let node = document.querySelector(selector)
	let stack = []
	console.log(node.tagName)
	node.childNodes.forEach( (e, i) => {
		stack.push(e)
	})
	while(stack.length){
		let single = stack.shift()
		if (single.tagName) console.log(single.tagName)
		single.childNodes.forEach((e, i) => {
			stack.push(e)
		})
	}
}
traverseNodes('body')