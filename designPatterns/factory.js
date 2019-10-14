/**
 * 工厂模式
 * 根据传入的信息，做一个对象类的创建
 */
class Fruit {
  constructor() {
    this._name = "";
  }
  set name(param) {
    this._name = param;
  }

  get name() {
    return this._name;
  }
}

function factory(name) {
  const fruit = new Fruit();
  fruit.name = name;
  return fruit;
}

const apple = factory("苹果");
const banana = factory("香蕉");

console.log("apple", apple.name);
console.log("banana", banana.name);
