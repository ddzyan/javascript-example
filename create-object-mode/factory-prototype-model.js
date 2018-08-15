//组合工厂模式和原型模式
//不需要进行共享的属性或者方法可以定义构造函数中，每次实例的时候进行实例化新的
const Person = function (name, job, age) {
    this.name = name;
    this.job = job;
    this.age = age;
}

//需要共享的属性或者方法定义在 prototype 属性中，每次实例化不需要进行实例化新的
Person.prototype = {
    sayName: function () {
        console.log(this.name);
    }
}

//将原型模式和工厂模式全部放在构造函数内进行实现
/* const Person2 = function (name, job, age) {
    this.name = name;
    this.job = job;
    this.age = age;

    if (typeof this.sayName != 'function') {
        this.sayName = function () {
            console.log(this.name);
        }
    }
} */

console.log(组合工厂模式和原型模式);
const person1 = new Person('test1', 1, 'it');
const person2 = new Person('test2', 2, 'cs');
person1.sayName();
console.log((person1.sayName === person2.sayName));