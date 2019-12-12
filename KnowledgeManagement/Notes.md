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