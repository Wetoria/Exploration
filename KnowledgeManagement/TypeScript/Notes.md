```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```

「相当于Person里只能有stirng或number类型的属性，那方法呢？」

```ts
let arr: object[] | string[] = ['s', 1];
```

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

「真得啰嗦」

```ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

let tom: Cat = {
    name: 'Tom',
    run: () => { console.log('run') }
};
let animal: Animal = tom;

// animal.run();

(tom as Animal).run()
```

「如果子类被断言为父类，则不可以调用子类独有的属性」

```ts
let p: Person = { name: 'test' };

console.log(((p as any) as Test).age);


interface Cat {
    run(): void;
}
interface Fish {
    swim(): void;
}

function testCat(cat: Cat) {
    return (cat as any as Fish);
}
```

「所以可以省一个括号」

```ts
interface Animal {
    name: string;
}
interface Cat {
    name: string;
    run(): void;
}

const animal: Animal = {
    name: 'tom'
};
let tom = animal as Cat;

// ----

const animal: Animal = {
    name: 'tom'
};
let tom: Cat = animal;

// index.ts:12:5 - error TS2741: Property 'run' is missing in type 'Animal' but required in type 'Cat'.
```

> 类型声明是比类型断言更加严格的

> 所以为了增加代码的质量，我们最好优先使用类型声明，这也比类型断言的 as 语法更加优雅。

> 使用全局变量的声明文件时，如果是以 npm install @types/xxx --save-dev 安装的，则不需要任何配置。如果是将声明文件直接存放于当前项目中，则建议和其他源码一起放到 src 目录下（或者对应的源码目录下）

「所以如果是自己下文件，声明文件也得包括进来，如果是npm安装的，倒是不用这一步，不过依旧会在项目里多出声明文件，不过打包应该不会包括进去。不过还是觉得傻逼」


```ts
// hello.d.ts
interface Person {
  name: string,
}

// hello.ts
let p: Person = { name: 'test' };
```

「应该是没有tsconfig，没有配置includes，所以解析不了」

「[TS入门教程](https://ts.xcatliu.com/basics/declaration-files.html)这个教程到声明文件这部分了是真的烦，一直报错」

「emmm，是我文件没删，报错都不是同一个文件。。。」

```
test.ts:6:9 - error TS1155: 'const' declarations must be initialized.

6   const name: string;
          ~~~~

test.ts:8:14 - error TS2391: Function implementation is missing or not immediately following the declaration.

8     function baz(): string;
               ~~~


Found 2 errors.
```

「报错的文件，在最前面」