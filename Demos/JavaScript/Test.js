// function Counter() {
//   var start = Date.now();
//   this.num = 0;
//   this.timer1 = setInterval(function() {
//     this.num++;
//     var gap = Date.now() - start;
//     console.log('timer1', this.num, gap);
//   }, 996);

//   JSON.parse('{"desc":"..."}');
//   // 解析1024ms

//   this.timer2 = setTimeout(() => {
//     this.num++;
//     var gap = Date.now() - start;
//     console.log('timer2', this.num, gap);
//   }, 0);
// }

// // 写出下面两种执行方式的前10行输出

// Counter();

// new Counter();

// var a = 20;
// var obj = {
//   a: 10,
//   c: this.a + 20,
//   fn: function () {
//     return this.a;
//   }
// }

// console.log(obj.c);

const arr = [1,2,3,4,5,6,7,8,9];

// function f(arr, n) {
//   const results = [];
//   const loopLength = Math.ceil(arr.length / n);
//   for (let i = 0; i < loopLength; i++) {
//     results.push(arr.splice(0, n))
//   }
//   return results;
// }

// function f(arr, n) {
//   return arr.reduce(function (results, cur) {
//     let inResults = true;
//     let temp = results[results.length - 1];
//     temp = temp.length < n ? temp : (inResults = false, []);
//     temp.push(cur);
//     inResults || results.push(temp);
//     return results;
//   }, [[]]);
// }

// function f(arr, n) {
//   return arr.reduce(function (results, cur) {
//     let list = results[results.length - 1];
//     const isFull = list.length === n;
//     isFull ? results.push([cur]) : list.push(cur);
//     return results;
//   }, [[]]);
// }

// function f(arr, n) {
//   return arr.reduce((results, cur) => (results[0].length === n ? results.unshift([cur]) : results[0].push(cur), results), [[]]).reverse();
// }

// console.log(f(arr, 4));

async function async1() {
  console.log('8');
  await async2();
  console.log('7');
}

async function async2() {
  console.log('4');
}

console.log('6');

setTimeout(function() {
  console.log('1');
})

async1();

new Promise(function(resolve) {
  console.log('3');
  resolve();
}).then(function (){
  console.log('2');
})

console.log('5');