
在ES5中有两种声明变量的方法分别是var命令和function命令。在ES6中声明变量的方法扩展为了6种，还有let、const、import、class命令。在这里说一下const命令。

# const的基本用法
const命令声明一个只读常量，常量的值不可以改变。
```
const x = 2018;
x = 2019;       // Uncaught TypeError: Assignment to constant variable.
```

可以看出来，在const声明的常量值不可以改变。这也就意味着const一旦声明常量，就要立即初始化常量。

```
const x;        // Uncaught SyntaxError: Missing initializer in const declaration
```

由此看出声明const常量时必须赋值。

# 与let有一样的特征

## 暂时性死区

与let命令一样，const也存在暂时性死区，只能在声明后使用它。

```
console.log(x);     // Uncaught ReferenceError: x is not defined
const x = 5;
```
## 作用域

还是与let命令一样，const命令只在声明它的块级作用域内有效。

```
if(true){
    const x = 2018;
}
console.log(x);     // Uncaught ReferenceError: x is not defined
```

## 不可重复声明

```
const x = 2018;
const y = 2019;
const x = 2010;         // Uncaught SyntaxError: Identifier 'x' has already been declared
const y = 2011;         // Uncaught SyntaxError: Identifier 'y' has already been declared
```

# const命令的本质

const本质是变量值不可改变吗？并不是，学过C语言的都知道常量值是保存在地址中的，那么const的常量值不可改变，是指指向常量的那个内存地址不得改动。在js中分为简单数据类型和复合数据类型。对于简单数据类型，值就保存在变量指向的内存地址中。而对于复合数据类型，变量指向的是指向数据结构的指针，const只能保证这个指针不会发生改变，但是指针的另一头：指向的数据结构，就不能保证它不会发生变化。

```
const x ={};
x.int = 2018;
x.char = 'change';

console.log(x.int);         // 2018

x.int = 2015;

console.log(x.int);         // 2015
console.log(x.char);        // change
```
以上代码我们改变了对象属性(指针所指向的数据结构)，x指向的对象还是发生了改变。

# Object.freeze

如果我们想让const指向的对象也不能改变怎么办，那么我们就需要Object.freeze方法了。

```
const x = Object.freeze({});
x.int = 2018;               // 严格模式下会报错
console.log(x.int);         // undefined
```

在我们冻结了对象之后对象就完全冻结了吗？NO，如果对象的属性还是一个对象呢，它的值能不能改变？所以，我们还需要冻结对象的属性。


以下函数可以彻底冻结一个对象：
```
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach( (key, i) => {
        if( typeof obj[key] === 'object'){
            constantize(obj[key]);
        }
    });
}
```

封面画师：[BF.]


[BF.]:https://www.pixiv.net/member.php?id=90570
