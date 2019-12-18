# Notes

My own notes, recorded when I am exploring something.

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


## 2019-12-18

### VS Code

Use `cmd+enter` to create a new line below, or use `cmd+shift+enter` to create a new line above.