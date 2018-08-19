function Test() {
    this.demo2 = 2;
    this.demo1 = 4;
}

Test.demo3 = 3;

Test.prototype = {
    demo1: 1
};

const test = new Test();
console.log(test.demo1)
/*
demo3 定义在Test对象上,实例化的对象无法访问
demo1 定义在Test的prototype原型属性上,所有实例化的对象共用一个
demo2 定义在实例化对象test上,每个实例化的对象都有一个,互不影响
由于子类在构造函数内定义了一个与父类相同名称的属性 demo1 ,则根据取值规则,父类的 demo1 属性将取不到
*/