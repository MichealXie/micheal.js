// 一个把 lisp 代码转换为 c 的超 mini 编译器
// 分为3个阶段
// 1. 解析: 1.1 词法解析: 将字符串转换为一个 tokens 数组
// 				 1.2 语法解析: 将 tokens 数组转化为一个 AST(抽象语法树)
// 2. 转换: 将 ast 转换为更适合生成代码的新 ast
// 3. 生成代码:  根据新 ast 生成代码

// 阶段一: 词法分析器

function tokenizer(input) {
	// 位置记录
	var current = 0
	// 存放 Token
	var tokens = []
	while (current < input.length) {
		var char = input[current]
		// 首先检查是不是左圆括号开头
		if (char === '(') {
			// 是就添加 token
			tokens.push({
				type: 'paren',
				value: '('
			})
			// 指针移动
			current++
			continue
		}
		// 下一个检查的是数字
		var NUMBERS = /[0-9]/
		if (NUMBERS.test(char)) {
			var value = ''
			// 数字跟括号不同, 多个数字一起仍代表一个 token
			// 这里我们再循环一次, 找到连续的所有数字
			while (NUMBERS.test(char)) {
				value += char
				char = input[++current]
			}
			// 查找完毕即放入 tokens
			tokens.push({
				type: 'number',
				value: value
			})
			continue
		}
		// 最后检查 name 类型, 由字母构成
		var LETTERS = /[a-z]/i
		if (LETTERS.test(char)) {
			var value = ''
			// 数字跟括号不同, 多个数字一起仍代表一个 token
			// 这里我们再循环一次, 找到连续的所有字母
			while (LETTERS.test(char)) {
				value += char
				char = input[++current]
			}
			// 查找完毕即放入 tokens
			tokens.push({
				type: 'name',
				value: value
			})
			continue
		}
		// 假如没有匹配到任何以上类型的 token => 抛出一个错误
		throw new TypeError('I dont know what this character is: ' + char);
	}
	return tokens
}


// 第二阶段!!!!  这里是语法分析器

function parser(tokens){
	// 再来一个指针
	var currnet = 0

	// 根节点是一定的, 直接创造
	var ast = {
		type: 'Program',
		body: []
	}
	while (current < tokens.length) {
		ast.body.push(walk())
	}
	return ast

	// walk 函数的目的是递归历遍 tokens, 把扁平的 tokens 数组变成有层次的 AST对象
	function walk(){
		var token = tokens[current]

		if(token.type === 'number'){
			current++
			return {
				type: 'NumberLiteral',
				value: token.value
			}
		}
		// 左圆括号
		if(token.type === 'paren' && token.value === '('){
			// 自增 current, 跳过第一个左圆括号, 因为括号在 AST 中是不需要的
			token = tokens[++current]

			var node = {
				type: 'CallExpression',
				name: token.value,
				params: []
			}
			// 再自增一次, 因为紧跟在左圆括号后面的 token 一定是调用的函数的名字。
			// 这就是 lisp 的语法了...
			token = tokens[++current]
			// 循环直至碰到右圆括号
			while (
				(token.tzype !== 'paren') ||
				(token.type === 'paren' && token.value !== ')')
			){
				// 碰到即断定中间代码为此括号的 params 值, 并结束节点
				// 关键点在于: 
				// 把一个数组, 变成一颗语法树, 树的分叉点是左圆括号
				// 结束当前分叉进入下一个分叉, 是右圆括号
				node.params.push(walk())
				token = tokens[current]
			}
			// 跳过最后一个右圆括号
			current++
			return node
		}
		// 不知道的类型就抛出错误
		throw new TypeError(token.type)
	}
}
//     第二部分!!!!
//     2.1 历遍器!!! 


// traverser意为穿梭, 穿梭节点并触发 visitor 上的方法(假如有的话)
function traverser(ast, visitor){
	
	function traverseArray(array, parent){
		array.forEach(function(child){
			traverseNode(child, parent)
		})
	}

	function traverseNode(node, parent){
		// 根据类型名称来确定有没有对应的处理方法
		var method = visitor[node.type]
		// 假如有对应的方法, 那么执行他
		if(method){
			method(node, parent)
		}
		// 历遍
		switch( node.type ){

			case 'Progarm':
				traverseArray(node.body, node)
				break
			
			case 'CallExpression':
				traverseArray(node.params, node)
				break

			case 'NumberLiteral':
				break

			default:
				throw new TypeError(node.type);
		}
	}

	traverseNode(ast, null)
}

//    2.2转换器 将 AST 转化为新的 AST

function transformer(ast){
	var newAst = {
		type: 'Program',
		body: []
	}
	// 因为 js 中变量的引用类型只是一个地址, 
	// 所以放入 _context 的节点相当于放入了newAst.body中
	ast._context = newAst.body
	traverser(ast, {
		NumberLiteral: function(node, parent) {
			parent._context.push({
				type: 'NumberLiteral',
				value: node.value
			})
		},
		CallExpression: function(node, parent){
			var expression = {
				type: 'CallExpression',
				callee: {
					type: 'Identifier',
					name: node.name
				},
				arguments: []
			}
			// 再次引用, 修改 arguments 会修改 newAst 的 body
			node._context = expression.arguments
			// 如果父节点不是一个 CallExpression
			if (parent.type !== 'CallExpression'){
				// 那么... 给他包裹一层
				expression = {
					type: 'ExpressionStatement',
					espression: espression
				}
			}
			parent._context.push(expression);
		}
	})
	return newAst
}


//    3. 代码生成器

function codeGenerator(node){

	switch(node.type){
		case 'Program':
			// 根节点下的逐个生成一下代码, 还换行
			return node.body.map(codeGenerator).join('\n')

		case 'ExpressionStatement':
			// 还自动加分号....		
			return codeGenerator(node.expression) + ';'

		case 'CallExpression':
			// callee 是操作符, arguments 是参数, 参数也要生成代码
			return codeGenerator(node.callee) + '(' + node.arguments.map(codeGenerator).join(', ') + ')'

		case 'Identifiers':
			// 遇到操作符返回操作符名称
			return node.name
		
		case 'NumberLiteral':
			// 遇到数字直接返回数字
			return node.value
		
		// 没遇到... 那就报错吧
		default:
		throw new TypeError(node.type);
	}
}




//  最后! 编译器

function compiler(input){
	var tokens = tokenizer(input)
	var ast = parser(tokens)
	var newAst = transformer(ast)
	var output = codeGenerator(newAst)
	return output
}

// 导出~
module.exports = {
	tokenizer: tokenizer,
	parser: parser,
	transformer: transformer,
	codeGenerator: codeGenerator,
	compiler: compiler
};



// https://github.com/starkwang/the-super-tiny-compiler-cn/blob/master/super-tiny-compiler-chinese.js
// 最后...谢谢上面的老哥(小姐姐)让我了解了 babel/webpack 的各种插件的工作原理