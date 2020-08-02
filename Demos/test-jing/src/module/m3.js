import { count, obj, r } from './m1';

console.log(obj === r());

console.log(count);

import { incre } from './m2';

incre();

console.log(count);


const m4 = require('./m4')
console.log(m4);

console.log(m4.obj === m4.rr());
