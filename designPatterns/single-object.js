/**
 * 单例模式
 */

class Apple {
  get name() {
    return this.name;
  }

  set name(name) {
    this.name = name;
  }
}

let apple;
function SingleObject() {
  if (!apple) {
    console.log("实例化一次");
    apple = new Apple();
  }
  return apple;
}

const apple2 = new SingleObject();
const apple3 = new SingleObject();
