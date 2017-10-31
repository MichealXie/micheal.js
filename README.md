# micheal.js
这是我封装的常用函数, 包括:
### 1. 类jquery 选择器:
$("css 选择器")选择单个元素  $$("css 选择器")选择群体元素
### 2. 继承:
对两个构造函数实现继承, 使用方法: inherit(super, sub), 值得注意的是: 
  + 在继承之前, 构造函数产生的对象是没有继承到方法的, 故使用方法是: 
    - function Sup
    - function Sub
    - inheri(Sup, Sub)
    - 构造实例
### 3. ajax: 
使用方法: 
```
var obj = {
  url: "https://jirenguapi.applinzi.com/fm/getChannels.php",
  method: 'get',//默认为 get
  data:{
    user:"1"
  },
  onsuccess: function(data) {
    console.log(data) //回调函数
  }
}

myAjax(obj)
```
