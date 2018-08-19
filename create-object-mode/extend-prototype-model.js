/*
使用原型属性实现继承
*/

//父类
function SuperType() {
    this.superValue = false;
}

SuperType.prototype.getSuperValue = function () {
    console.log(this.superValue);
}

//子类
function SubType() {
    this.subValue = true;
}

//继承父类方法和属性
SubType.prototype = new SuperType();

//子类添加新的方法
SubType.prototype.getSubType = function () {
    console.log(this.subValue);
}

//实例化新对象
const instance2 = new SubType();
instance2.__proto__.superValue = true;

const instance = new SubType();
instance.getSuperValue();

/* 总结
SuperType 的原型属性将被赋值到 SubType 的 _proto_ 上
SuperType 构造函数中 this 对象是 SubType.prototype ,所以在构造函数中定义的属性将被赋值到 SubType.prototype 上
SubType 的原型属性将被赋值到 instance 对象的 _proto_ 中
SubType 构造函数中 this 对象是 instance 对象 ,所以在构造函数中定义的属性将被赋值到 instance 上

缺点
父类构造函数中的值，在所有子类实例化的对象中将共享
 */