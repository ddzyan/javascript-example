//原型模式
function Person() {
    //构造函数
    this.number = '0001';
}

//prototype 对象包含一个 constructor 属性 指向原型对象的 constructor 方法 。
//如果进行重写将不再指向原型对象的 constructor
Person.prototype = {
    constructor: Person,
    name: 'test1',
    age: 1,
    job: 'it',
    number: '0002',
    sayName: function () {
        console.log(this.name);
    }
}

//此写法为在原型对象的 prototype 添加而不进行重写
//两种写法在实际使用场景没什么区别，除非你要判断构造函数属性
//Person.prototype.name = 'test2';

const person1 = new Person('test1', 1, 'it');
const person2 = new Person('test2', 2, 'cs');

console.log('原型模式');
person1.sayName();
console.log(person1.number);
console.log((person1.sayName === person2.sayName));
console.log((person1.constructor === Person));

/*缺点
所有属性或者方法定义在原型对象上，进行动态修改将影响全部实例化对象
*/