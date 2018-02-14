function Animal(){

}
Animal.prototype.行动 = function(){}

function Human(obj){
	Animal.call()
	this.name = obj.name
	this.birthday = obj.birthday
}
Human.prototype.物种 = '人类'
Human.prototype.特点 = "使用工具"


Human.prototype.__proto__ = Animal.prototype

function Asian(obj){
 	Human.call(this, obj)
	this.city = obj.city
}
Asian.prototype.肤色 = '黄'
Asian.prototype.__proto__ = Human.prototype

var a = new Asian({
	name:'micheal',
	birthday: '95-09-26',
	city: "shantou"
})
a

// class Animal{
// 	constructor(){

// 	}
// 	行动(){

// 	}
// }

// class Human extends Animal{
// 	constructor(obj){
// 		super(obj)
// 		this.name = obj.name
// 		this.birthday = obj.birthday
// 	}
// 	物种(){

// 	}
// 	行为(){

// 	}
// }

// class Asian extends Human{
// 	constructor(obj){
// 		super(obj)
// 		this.city = obj.city		
// 	}
// 	肤色(){

// 	}
// }
// var a = new Asian({
// 	name: 'micheal',
// 	birthday: '95-09-26',
// 	city: "shantou"
// })
// a
