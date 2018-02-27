# 这里放着很多常用函数
这是我封装的常用函数, 包括:

### 1. 类jquery 选择器:
$("css 选择器")选择单个元素  $$("css 选择器")选择群体元素

### 2. 继承:
对两个构造函数实现继承, 使用方法: inherit(super, sub), 值得注意的是:
  在继承之前, 构造函数产生的对象是没有继承到方法的, 故使用方法是:
    - function Sup
    - function Sub
    - inheri(Sup, Sub)
    - 构造实例
### 3. 检测数组中有几个相同值:
使用方法: `repeatNum([1,2,3,4,5,1],1)`

### 4. ajax:
使用方法: 只支持 json 格式
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

### 5. jsonp"
使用方法:
```
jsonp(url + functionString)
//如: jsonp("xxx.com", "test")
```

### 6. 一个lisp 转 c 的编译器
源码是  *babel-compiler.js*   
转换效果如下: 

                   LISP                      C
 
    2 + 2          (add 2 2)                 add(2, 2)
    4 - 2          (subtract 4 2)            subtract(4, 2)
    2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))

### 7. 节流/ 防抖

### 8.柯里化

### 9. 数组去重/ 拍平

### 10. 自制简易 promise

## 11. **自制简易 vue**

### 12. 二分搜索

### 13. 深浅拷贝

### 14. 迭代器创造斐波那契

### 15. 数字迭代器

### 16. lazyman

### 17. vue 生命周期示例

### 18. 自制 reduce

### 19. 洗牌算法

### 20. setTimeout 模拟 Interval

