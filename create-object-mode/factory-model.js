//工厂模式
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = sayName;
}

//将sayName方法定义在函数外部，避免了每次实例化一个新的Person对象时都需要再实例化一个相同功能的 sayName 对象。
//现在sayName为指向同一地址的指针。
function sayName() {
    console.log(this.name);
}

/*new 操作实际包含：
1.创建对象
2.将构造函数内的作用域赋给新对象
3.执行构造函数
4.返回对象 */
console.log('工厂模式');
const person1 = new Person('test1', 1, 'it');
const person2 = new Person('test2', 2, 'cs');
person1.sayName();
console.log((person1.sayName === person2.sayName));

/* 缺点
无法做到属性和方法的共享，每次实例化都需要实例新的，除非将对象定义在构造函数外部，进行引用。
*/

