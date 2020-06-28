# Vuejs权威指南

## 1 遇见Vue.js

### 1.1 MVX模式是什么

MVC框架最早出现在Java领域，然后慢慢在前端开发中也被提到，后来又出现了MVP，以及现在最成熟的MVVM

#### 1.1.1 MVC

Model、Controller、View

V一般通过C来和M进行联系。C是M和V的协调者，V和M不直接联系

基本联系都是单向的

用户通过C来操作M以达到V的变化

#### 1.1.2 MVP

MVP是从经典的MVC模式演变而来的

它们的基本思想有想通的地方：C/Presenter负责逻辑的处理，M提供数据，V负责显示

在MVP中，Presenter完全把V和M进行了分离，主要的程序逻辑在P里实现。

P与具体的V没有直接关联，而是通过定义好的接口进行交互，从而使得在变更V的时候可以保持P不变

#### 1.1.3 MVVM

MVVM代表框架：Knockout、Ember.js、AngularJS、Vue.js

相比前两种模式，MVVM只是把MVC的C和MVP的P改成了ViewModel

V的变化会自动更新到VM，VM的变化也会自动同步到V上显示

这种自动同步是因为ViewModel中的属性实现了Observer，当属性变更时都能触发对应的操作

### 1.2 Vue.js是什么

<!-- 介绍Vue，以及与其他框架的区别，没有详细看 -->

## 2 数据绑定

### 2.1 语法

#### 2.1.1 插值

有时候只需要渲染一次数据，后续数据变化不再关心，可以通过“*”实现。

```html
<span>Test: {{ *text }}</span>
```

双打括号标签会把里面的值全部当作字符串来处理，如果值是HTML片段，可以使用三个打括号来绑定。

```html
<div>Logo: {{{ logo }}}</div>
```

