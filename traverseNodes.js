function traverseNodes(selector){
	let stack = []
	stack.push(document.querySelector(selector))
	while(stack.length){
		let node = stack.shift()
		if (node.tagName) console.log(node.tagName)
		node.childNodes.forEach((e, i) => {
			stack.push(e)
		})
	}
}
traverseNodes('body')

// 深度优先

function deepTraverse(node){
	node.childNodes.forEach( (e, i) => {
		console.log(node.tagName)
		if (e.childNodes.length) deepTraverse(e)
	})
}

deepTraverse(document.querySelector('body'))