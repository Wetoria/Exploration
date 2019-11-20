# Reduce

# 函数定义

`arr.reduce(callback(total, currentElement[, currentIndex[, arr]])[, initialValue])`

## 参数

- **callback**  
  必传。如果没传会报`Uncaught TypeError: undefined is not a function`  
  类似于`forEach`、`map`等方法。第二至第四个参数分别为当前元素，当前元素的索引，遍历的数组。  
  如果提供`inititalValue`，从`0`开始遍历；否则取arr[0]作为初始total，从`1`开始遍历数组。

- **initialValue**  
  total的初始值。如果没给，会取第一个元素作为初始值。

## 其他

如果数组为空且没有`initialValue`，会报`Uncaught TypeError: Reduce of empty array with no initial value`.

如果数组仅有一个元素（无论位置如何）并且没有提供`initialValue`， 或者有提供`initialValue`但是数组为空，那么此唯一值将被返回并且`callback`不会被执行。

```js
var maxCallback = ( acc, cur ) => Math.max( acc.x, cur.x );
var maxCallback2 = ( max, cur ) => Math.max( max, cur );

// reduce() 没有初始值
[ { x: 22 }, { x: 42 } ].reduce( maxCallback ); // 42
[ { x: 22 }            ].reduce( maxCallback ); // { x: 22 }
[                      ].reduce( maxCallback ); // TypeError

// map/reduce; 这是更好的方案，即使传入空数组或更大数组也可正常执行
[ { x: 22 }, { x: 42 } ].map( el => el.x )
  .reduce( maxCallback2, -Infinity );
```