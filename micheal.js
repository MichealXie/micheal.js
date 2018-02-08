function $(selec) {
  return document.querySelector(selec);
}

function $$(selec) {
  return document.querySelectorAll(selec);
}
//只能对构建函数使用, 且要先继承, 再创建的实例才有继承的方法/属性
function inherit(sup, sub) {
  // ES6 可以一行代码嘿嘿, 因为修复了 constructor 的指向
  // Object.setPrototypeOf(Child.prototype, Parent.prototype)
  sub.prototype = Object.create(sup.prototype)
  sub.prototype.constructor = sub
}

function repeatNum(array, aim) {
  var num = 0
  for (var i = 0; i < array.length; i++) {
    if (array[i] === aim) num++
  }
  return num
}

function arrayRemove(array, aim){
  let index = array.indexOf(aim)
  if(index >= 0) array.splice(index, 1)
}

var obj = {
  url: "https://jirenguapi.applinzi.com/fm/getChannels.php",
  method: 'get',
  data:{
    user:"1"
  },
  onsuccess: function(data) {
    console.log(data)
  }
}

myAjax(obj)

function myAjax(obj) {
  if (!obj.url) return
  var url = obj.url,
    method = obj.method || "GET",
    type = obj.type || "json",
    isAsync = obj.async || "true",
    onsuccess = obj.onsuccess || function() {},
    onerror = obj.onerror || function() {},
    data = obj.data || {},
    dataStr = []

  var xhr = new XMLHttpRequest()
  if (method === "GET") {
    for (key in data) {
      dataStr.push(key + "=" + data[key])
    }
    dataStr.join("&")
    url = url + "?" + dataStr
    xhr.open("GET", url, isAsync)
    xhr.send()
  } else if (method === "POST") {
    xhr.open("POST", obj.url, obj.async)
    xhr.send(data)
  }
  xhr.onerror = onerror();
  xhr.onload = function() {
    var data = JSON.parse(xhr.response);
    onsuccess(data)
  }
}

function myJsonp(url, fnName){
  var script = document.createElement('script');
  script.setAttribute('src', url + "?callback=" + fnName);
  script.classList.add("temp")
  $('body').appendChild(script)
  $("body").removeChild($("script.temp"))
}

myJsonp("http://api.douban.com/v2/movie/in_theaters", "test")

function test(data){
  console.log(data)
}


// 柯里函数
function curry(fn, thisArg) {
  if (!Array.isArray(thisArg)) {
    thisArg = []
  }
  return function (things) {
    let args = Array.from(arguments)
    if (fn.length > (args.length + thisArg.length)) {
      return curry(fn, thisArg.concat(args))
    }
    return fn.apply(this, thisArg.concat(args))
  }
}

function add(a, b, c) {
  return a + b + c
}
let foo = curry(add)
console.log(foo(2)(3)(4))