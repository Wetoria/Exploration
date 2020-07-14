// setTimeout(() => console.log(1), 0);

// setTimeout(() => {
//   console.log(2);
//   Promise.resolve().then(() => {
//     console.log(p3);
//   }).catch(() => console.log(4))
//     .then(() => {
//       console.log(8);
//     });
//   setTimeout(() => console.log(5), 0);
// }, 0);

// setTimeout(() => console.log(6), 0);

// Promise.resolve().then((res, rej) => {
//   console.log(7);
//   rej();
// }).catch(() => console.log(9))
//   .then(m => console.log('t ', m))
//   .catch(e => console.log('c', e));

const promise = new Promise(resolve => {
  console.log(4);
  resolve(5);
});

function func1() {
  console.log(1);
}

function func2() {
  setTimeout(() => {
    console.log(2)
  }, 0)
  func1()
  console.log(3)
  promise.then((res) => {
    console.log(res);
  }).then(() => {
    console.log(6)
  })
}

func2()