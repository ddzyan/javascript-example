/**
 * 调用父类的构造函数赋值在子类上，实现继承
 */

 //父类
function SuperType() {
    this.superValue = false;
}

SuperType.prototype.getSuperValue = function () {
    console.log(this.superValue);
}

//子类
function SubType(){
    SuperType.call(this);
}

const instance = new SubType();

console.log(instance.superValue);
instance.getSuperValue();//instance.getSuperValue is not a function

/**总结
 * 调用父类的 call 或者 apply 方法实现的继承，无法继承父类的 prototype 
 * 
 * 缺点
 * 只能继承父类构造函数中的属性,无法获得父类的 prototype属性
 */