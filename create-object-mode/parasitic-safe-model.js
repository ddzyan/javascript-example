/*寄生模式
在构造函数内实例化一个全新的对象，并且对对象进行操作，返回这个实例化的对象，类似于继承
这样的操作使返回的新对象与Person毫无关系
*/
const Person1 = function (name, job, age) {
    const object = new Object();
    object.name = name;
    object.job = job;
    object.age = age;
    return object;
}

/*安全模式
在构造函数内实例化一个全新的对象并且返回，不对对象进行任何赋值使传来的参数无法进行修改，只能通过sayName进行读取。类似于继承和私有方法。
这样的操作使返回的新对象与Person毫无关系
*/
const Person2 = function (name, job, age) {
    const object = new Object();
    object.sayName = function () {
        console.log(name);
    }
    return object;
}