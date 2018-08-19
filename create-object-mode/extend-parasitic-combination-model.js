/**
 * 寄生组合式继承
 */

//将父级的 prototype 赋值在一个新的对象上,并且将这个对象赋给子类
function inheritPrototype(object1, object2) {
    const prototype = new Object(object1.prototype);
    prototype.constructor = object1;
    object2.prototype = prototype;
}

//父类
function SuperType(name) {
    this.superName = name;
    this.color = ['red', 'blue'];
}
SuperType.prototype.getSuperName = function () {
    console.log(this.superName);
}

//子类
function SubType(name, subName) {
    SuperType.call(this, name);
    this.subName = subName;
}

//子类继承父类的 prototype 属性
inheritPrototype(SuperType, SubType);

//子类添加新的方法在 protype 属性上
SubType.prototype.getSubTypeName = function () {
    console.log(this.subName);
}

const instance = new SubType('demo', 'test');
console.log(instance.superName);
instance.getSubTypeName();
instance.color.push('green');
console.log(instance.color);

const  instance2 = new SubType('demo', 'test');
console.log(instance2.color);

/**
 * 总结
 * 子类 prototype 继承 父类的 prototype 属性时，不采用 new 方式，则无法使构造函数内的属性赋值到子类的 prototype 属性上，避免了重复的参数出现
 */