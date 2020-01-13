# Notes

My own notes, recorded when I am exploring something.

## 2020-01-13

### VuePress
在styl中使用绝对路径来处理图片路径问题，暂时没去找其他的解决方案了。
```css
background-image: url('/images/bg4.jpg')
```


## 2020-01-10

### Experience
附件的deleted字段都为true了，相当于需要保存的数据为空，这个时候没有做判断.

### Markdown 锚点

```
[Content](#anchor)

<span id="anchor"></span>
```


## 2020-01-03
`JSON.stringify` 序列化的对象不能包括自己本身，否则会报错。


## 2020-01-02

### Vue
`$emit`会有性能开销，如果处理的数据较多，`$emit`次数过多的话，会导致性能崩掉。类似于`selection-change`这种操作，不应该触发子元素的`emit`事件。及组件内部的修改，不应该触发子组件的`emit`。

## 2019-12-21

### Webpack `require.context`

第三个参数用来去匹配获取的路径，是否满足正则条件。该方法获取的路径如下：

```
./FileUtils.js
./StringUtils.js
./Test/T/index.js
./Test/index.js
./Test/router/index.js
./index.js
./init.js
```

`Webpack` 会用正则去跟这些路径做比较，满足条件的就会被留下来。


## 2019-12-20

### Mac DNS Lookup

Open `alfred` or `spotlight` to search `Network tools`, select `lookup`, enter the site to find the ip.

Or use `nslookup` in `terminal`.


## 2019-12-18

### VS Code

Use `cmd+enter` to create a new line below, or use `cmd+shift+enter` to create a new line above.


## 2019-12-16

### Markdown table style

Use like this:
```markdown
<style>
.numeric-conversion-rules table th:first-of-type {
  width: 150px;
}
</style>
<div class="numeric-conversion-rules">

  |__Head1__|__Head2__|
  |---------|---------|
  |  body1  |  body2  |

</div>
```

### Vue url resolve 

Use `~` to resolve path in `<template>`. Like this:
```html
<img src="~p@/img.png" />
```


## 2019-12-13

### Excel 条件格式
```
// $ means absolute path
// $A$1 $A1 A$1 A1
=IF(AND(OR(IF($K3<>"", 1, 0), IF($L3<>"",1,0)), IF(R3="",1,0)),1,0)
```

### Excel Freeze table header
1. Select A3
2. Click freeze


## 2019-12-12

### JavaScript class

```js
class Test {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this.name;
  }

  set name(val) {
    this.name = val;
  }
}
```

If use setter/getter like above, while occur below error.

```
Uncaught RangeError: Maximum call stack size exceeded
```

The correct way is to use like below:

```js
class Test {
  constructor(name) {
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(val) {
    this._name = val;
  }
}
```

Use a temp variable to store the value.

### Vue $scopedSlots

If bind scope to slot, use this to instead of $slots.

### Vue mixins

```js
// Input.vue
<script>
import { Input } from 'element-ui';

export default {
  mixins: [Input],
  props: {
    size: {
      default: 'mini',
    },
  },
  mounted() {
    this.$on('input', (e) => {
      console.log(e);
    });
  },
};
</script>
```

If use this way to set default props to a component, also can use below way to listener to event.

```html
<input @input="input">
```
