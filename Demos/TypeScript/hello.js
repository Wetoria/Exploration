"use strict";
exports.__esModule = true;
function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'Wetoria';
console.log(sayHello(user));
var arr = ['s'];
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
function buildName(firstName, lastName) {
    if (firstName === void 0) { firstName = '1'; }
}
buildName('1', 1);
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
var p = { name: 'test' };
console.log(p.age);
