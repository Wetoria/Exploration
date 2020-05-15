// const input = [
//   [0, 30],
//   [5, 10],
//   [15, 20],
//   [6, 9],
// ];

const input = [
  [0, 5],
  [1, 4],
  [2,3],
  [6, 7],
  // [5, 20],
  [8, 20],
  [9, 18],
  [12, 17],
  [14, 15],
];

function hanlder1(list) {
  const map = {};
  const len = list.length;
  for (let i = 0; i < len - 1; i++) {
    const cur = list[i];
    for (let j = i + 1; j < len; j++) {
      const each = list[j];
      const start = Math.max(cur[0], each[0]);
      const end = Math.min(cur[1], each[1]);
      const index = `${start}-${end}`;
      map[index] = map[index] ? map[index] + 1 : 2;
    }
  }
  let result = 0;
  for (const value of Object.values(map)) {
    result = Math.max(result, value);
  }
  return result;
}

function hanlder2(list) {
  const map = {};
  const len = list.length;
  let start = 0, end = 24, result = 0;
  for (const cur of list) {
    if (start <= cur[0] || cur[1] <= end) {
      result++;
      start = Math.max(start, cur[0]);
      end = Math.min(cur[1], end);
    }
  }
  return result;
}

function hanlder3(list) {
  const result = list.reduce((total, cur) => {
    if (total[0] <= cur[0] || cur[1] <= total[1]) {
      total[2]++;
      total[0] = Math.max(total[0], cur[0]);
      total[1] = Math.min(cur[1], total[1]);
    }
    return total;
  }, [0, 24, 0]);
  return result[2];
}

function hanlder4(list) {
  const result = list.reduce((total, cur) => {
    if (total[0] <= cur[0] || cur[1] <= total[1]) {
      total[2]++;
      total[0] = Math.max(total[0], cur[0]);
      total[1] = Math.min(cur[1], total[1]);
    } else {
      total[3] = Math.max(total[2], total[3]);
      total[0] = 0;
      total[1] = 24;
      total[2] = 0;
    }
    return total;
  }, [0, 24, 0, 0]);
  return result[3];
}

console.log(hanlder1(input));

console.log(hanlder2(input));

console.log(hanlder3(input));

console.log(hanlder4(input));