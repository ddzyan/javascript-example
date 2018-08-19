function SuperType(name) {
    this.supername = name;
}

SuperType.prototype.getSuperName = function () {
    console.log(this.supername);
}

function SubType() {
    SuperType.call(this, 'demo');//第二次调用父类的构造函数
    this.subName = 'SubType';
}

//使用原型属性继承父类的 prototype 属性
SubType.prototype = new SuperType(); //第一次调用父类的构造函数

SubType.prototype.getSubTypeName = function () {
    console.log(this.subName);
}

//由于重新定义了 prototype ,则需要重新定义构造函数指向 SubType ,否则 instanceOf() 将判断false
SubType.prototype.constructor = SubType;

const instance = new SubType();
instance.getSuperName();
console.log(instance.subName);

/**总结
 * 原型链和 call 方法的组合将实现继承父类 prototype 上的属性和修改父类构造函数中的属性
 * 使每个实例化的新对象，都拥有属于自己的 父类属性
 * 
 * 缺点 执行两次 SuperType 的构造函数
 * 在 new SuperType() 的时候，首先将 SuperType 的 prototype 属性赋值给子类的 prototype
 * 然后第一次执行 SuperType 的构造函数，this 对象修改为 子类的 prototype
 * 
 * 第二次执行 SuperType 的构造函数,将实例化的对象传入到父类的构造函数中，this 对象修改为实例化的新对象
 * 由于 this 对象和 this 的 prototype 属性上都具有相同的属性，则 prototype 属性上的值将取不到,从而浪费资源
 */