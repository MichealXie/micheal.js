// function test(str) {
// 	return str
// 		.replace(" ", "")
// 		.split("")
// 		.sort()
// 		.join("")
// 		.match(/(\w)\1*/g)
// 		.sort((x, y) => x.length - y.length)
// 		.pop()[0];
// }

// const res = test("123123    fdasdfasdfdajkgdkjakwejfcjase  jweijfkasjxjdge");
// console.log(res);

var str = '123123    fdasdfasdfdajkgdkjakwejfcjase  jweijfkasjxjdge'
function findMostLetter(str) {
	// 去除空格并排序
	let _str = str
		.replace(" ", "")
		.split("")
		.sort()
		.join("");
	let reg = /(\w)\1*/g;
	let match = _str.match(reg);
	let i = 0;
	let len = 0;
	match.forEach((item, index) => {
		if (item.length > len) {
			i = index
			len = item.length
			// console.log(len)
		}
	});
	return match[i].slice(0, 1);
}

console.log(findMostLetter(str))