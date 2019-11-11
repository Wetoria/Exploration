<details open>
  <summary>ES6新特性</summary>

- 1.const和let  
  const常量，let变量，用const声明的对象，可以修改属性，但不能修改变量名指向的对象  
  不会被变量提升 // 先使用再声明  
  只在最近的作用域内有效  

- 2.模板字符串——反引号
- 3.箭头函数
  - 不需要function关键字来创建
  - 可以省略return
  - **继承上下文中的this**

- 4.函数参数默认值
- 5.“...”操作符
- 6.对象和数组的解构
  - 数组的解构可以用来交换变量值  

- 7.for...of和for...in
  - of遍历数组
  - in遍历对象
- 8.类

</details>

<details open>
  <summary>Promise</summary>

- 1.Promise原理  
- 处理中，成功，失败  
- 只有由resovle或reject改变状态  
- 状态一经改变就不能再修改  
- then/catch
- all/race 全部成功/返回最快成功的

</details>

<details open>
  <summary>await/async</summary>

了解不多，不多说。
  - 用同步的方式写异步代码
  - await只能在async修饰的方法中使用
</details>

<details open>
  <summary>GitFlow</summary>

  GitFlow主要用来管理软件的版本控制，主要有master、release、develop、feature、hotfix等几个分支。
  master分支对应项目的生产环境
  release分支对应生产前的测试环境
  develop分支对应开发人员的测试环境
  hotfix分支一般是在生产出现问题时，从master分支切出来，修复完问题以后，需要合到dev以及一个预生产环境对应的分支。

  develop分支下还有feature和bugfix两个类型的分支，一个用于新功能开发，一个用于bug修复。

  要理解GitFlow主要是要理解为什么有各个分支，以及为什么做版本控制。
</details>

<details open>
  <summary>localStorage、sessionStorage、cookies</summary>

</details>

<details open>
  <summary>RESTful</summary>

  - get 获取资源
  - post 新建资源
  - put 更新资源
  - delete 删除资源
</details>

<details open>
  <summary>跨域</summary>

  - 同源策略
    - 协议、域名、端口是否相同
    - 不能读取Cookies、LocalStorage和IndexDB；无法获取DOM；无法发起AJAX请求

  - CORS
    - 目前浏览器都支持，关键是服务器端要支持。
</details>


CSS

盒子模型
BFC，Flex
局中
Grid


变量类型

JS 的数据类型分类和判断
值类型和引用类型


原型与原型链

原型和原型链定义
继承


作用域和闭包

执行上下文
this
闭包


性能问题

有没有做过性能优化
如何定位性能问题
如何解决的


webpack

loader
plugin
Tree Shaking
代码分割
打包优化技巧


Promise

Promise 及其方法的实现


HTTP 1/2

HTTP 有什么缺点
HTTP2 有什么好处
HTTPS 有什么好处， 有什么缺点，为什么。
TCP, UDP 的区别，  最佳场景
为什么说HTTPS 是安全的
解释一下加密过程
三次握手的过程，为什么握手三次, 为什么挥手四次


安全相关

XSS
CSRF


浏览器缓存策略

缓存头相关
浏览器 Cookie 相关


基础的数据结构和算法

Tree,
BFS
DFS
递归
动态规划


框架相关(如果你写了的话)

1、React diff
2、虚拟dom
3、react 受控 非受控组件
4、react 新旧生命周期
5、 事件传播
6、Event loop


一些发散性问题

输入URL 到页面展示发生了什么


稳定性保障

错误监控， 收集，分析


项目架构经验等
如何设计一个好的组件
