let view ={
	el: '#app',
	data: {
		array: '数组',
		language: '语言',
		role: '角色'
	},
	template: '{{array}}是一种非常重要的数据类型，它语法简单、灵活、高效。 在多数编程{{language}}中，数组都充当着至关重要的{{role}}',
	render(){
		// let el = document.getElementById(view.el)
		let regExp = /{{\w+}}/g
		// data 有什么就替换什么, 而不是从 template 切入
		for (let item in this.data) {
			this.template = this.template.replace(`{{${item}}}`, this.data[item])
		}
		// el.innerHTML = view.template
		return this.template
	}
}

console.log(view.render())