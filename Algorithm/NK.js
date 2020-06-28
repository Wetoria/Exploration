let a = 4;
let b = 2;

function hanlder(n, k) {
  const list = [];
  function f(results, arr, index, startNum) {
    for (let i = startNum; i <= n; i++) {
      const copy = [...arr];
      copy[index] = i;
      if (copy.length === k) {
        results.push(copy);
      } else {
        f(results, copy, index + 1, copy[index] + 1);
      }
    }
  }
  f(list, [], 0, 1);
  return list;
}

console.log(hanlder(a, b));