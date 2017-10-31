function $(selec) {
  return document.querySelector(selec);
}

function $$(selec) {
  return document.querySelectorAll(selec);
}
//只能对构建函数使用, 且要先继承, 再创建的实例才有继承的方法/属性
function inherit(sup, sub) {
  sub.prototype = Object.create(sup.prototype)
  sub.prototype.constructor = sub
}

function repeatNum(array, aim) {
  var num = 1
  for (var i = 0; i < array.length; i++) {
    if (array[i] === aim) num++
  }
  return num
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
