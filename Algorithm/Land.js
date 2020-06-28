// // const grid = [["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]];
// // const grid = [
// //   ["1", "1", "0", "0", "0"],
// //   ["1", "1", "0", "0", "0"],
// //   ["0", "0", "1", "0", "0"], 
// //   ["0", "0", "0", "1", "1"]
// // ];

const grid = [
  ["1", "1", "1"],
  ["0", "1", "0"],
  ["1", "1", "1"]
];

var numIslands = function (grid) {
  const result = [];
  const rowLen = grid.length;
  const isLandArea = [];
  for (let i = 0; i < rowLen; i++) {
    const row = grid[i];
    const colLen = row.length;
    for (let j = 0; j < colLen; j++) {
      if (grid[i][j] === '1') {
        isLandArea.push([i, j]);
      }
    }
  }
  function findNeighbor(room, rooms, queue) {
    const up = rooms.find(
      other => room[0] - 1 == other[0]
        && room[1] == other[1]
    );
    if (up) {
      if (!up[2]) {
        queue.push(up);
      }
      up[2] = true;
    }
    const right = rooms.find(
      other => room[0] == other[0]
        && room[1] + 1 == other[1]
    );
    if (right) {
      if (!right[2]) {
        queue.push(right);
      }
      right[2] = true;
    }
    const down = rooms.find(
      other => room[0] + 1 == other[0]
        && room[1] == other[1]
    );
    if (down) {
      if (!down[2]) {
        queue.push(down);
      }
      down[2] = true;
    }
    const left = rooms.find(
      other => room[0] == other[0]
        && room[1] - 1 == other[1]
    );
    if (left) {
      if (!left[2]) {
        queue.push(left);
      }
      left[2] = true;
    }
  }
  function setCombineFlag(rooms, fields = []) {
    rooms.sort((a, b) => {
      if (a[0] == b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
    let num = 0;
    // BFS扫描所有选中的房间
    while (rooms.length > 0) {
      let room = rooms.shift();
      const queue = [room];
      if (room[2]) continue;
      while (queue.length > 0) {
        room = queue.shift();
        findNeighbor(room, rooms, queue);
      }
      num++;
    }
    return num;
  }
  
  return setCombineFlag(isLandArea, result)
};

console.log(numIslands(grid));