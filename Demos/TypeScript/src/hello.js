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
var tom = {
    name: 'Tom',
    run: function () { console.log('run'); }
};
var animal = tom;
// animal.run();
// (tom as Animal).run()
var foo_1 = require("../types/foo");
console.log(foo_1.foo.name);
foo_1.foo.bar.baz();
var Directions;
(function (Directions) {
    Directions[Directions["Up"] = 0] = "Up";
    Directions[Directions["Down"] = 1] = "Down";
})(Directions || (Directions = {}));
var Up = Directions.Up, Down = Directions.Down;
var d = [Up, Down];
var test = <Cat></>;
