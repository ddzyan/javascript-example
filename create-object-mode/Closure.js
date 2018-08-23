function createFunction() {
    const result = [];

    for (var i = 0; i < 10; i++) {
        result[i] = function () {
            return i;
        }
    }
    console.log(`i :${i}`);
    return result;
}
const abc = createFunction();

for (let i = 0; i < 10; i++) {
    console.log(abc[i]());
}

/**总结
 * 在闭包函数 createFunction 中，使用var 定义 i，使 i 在整个闭包作用域中都有效。
 * 每次循环时，都重新给 i 赋值，导致所有函数都返回 10
 * 
 * 而如果使用 let 定义 i，则 i 只在循环这个作用域中有效。
 * 每次循环都会重新定义一个局部变量 i ，外部的打印将报错
 */

const name = 'The window';
const object = {
    name: 'The object',
    getName: function () {
        console.log(this.name);
    }
}

object.getName();

/**总结
 * getName 属于 object 对象的一个属性，则调用getName 方法时定义的 this 对象为 object
 * 每次循环时，都重新给 i 赋值，导致所有函数都返回 10
 * 
 * 而如果闭包函数中的 this 对象指的全局对象
 * 
 */