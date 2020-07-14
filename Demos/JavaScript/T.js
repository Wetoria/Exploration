function Sub(name) {
  function F() {
    this.name = name;
  }
  F.prototype = {
    getName() {
      console.log(this.name);
    }
  }
  F.getName = function() {
    console.log('name');
  }
  return F;
}


let s1 = new Sub('1');
let s2 = new (Sub('2'));

// console.log(s1);
s1.getName();
// s1.prototype.getName();

s2.getName();

function t() {
  console.log('t');
}

t.prototype.getName = function() { console.log('getname') };

t.getName();