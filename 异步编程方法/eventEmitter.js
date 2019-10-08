/**
 * 异步编程实现方法：事件驱动
 * 也可以称为：发布/订阅模式，观察者模式(设计模式中)
 */

/**
 * 原生代码实现消息订阅
 * 核心方法为：on(订阅)和 emit(发布)
 */
class EventEmitter {
  constructor() {
    // 创建一个对象，用于存放订阅事件
    this._event = Object.create(null);
  }
  //订阅
  on(type, handler) {
    (this._event[type] || (this._event[type] = [])).push(handler);
  }

  //发布
  emit(type, ...args) {
    /*  封装输入的参数到数组中，参数1表示去除第一个type参数, 最终结果为[1, 2, 3];
   let payload = [].slice.call(arguments, 1);
    console.log("payload :", payload); */
    // 获取指定 type 所有绑定的事件
    const array = this._event[type] || [];
    array.forEach(handler => {
      // 执行所有回调函数
      handler(...args);
    });
  }

  off(type, handler) {
    if (this._event[type]) {
      this._event[type].splice(this._event[type].indexOf(handler), 1);
    }
  }

  //绑定一次事件
  once(type, handler) {
    // 用于判断事件钩子是否执行的标识
    let fired = false;

    /**
     * 使用闭包包装 handler,使用箭头函数，绑定 EventEmitter 对象
     * 1. 移除消息监听数组中对应的事件钩子，防止二次执行
     * 2. 判断 handler 是否已经执行，防止有已经在执行的事件钩子
     * 3. 添加事件监听
     */
    const magic = (...args) => {
      this.off(type, handler);
      if (!fired) {
        fired = true;
        handler(...args);
      }
    };
    this.on(type, magic);
    // 添加闭包函数到 this._event
  }

  // 移除监听
  remove(type) {
    if (this._event[type]) {
      delete this._event[type];
    }
  }
}

const player = new EventEmitter();
player.on("start", name => {
  console.log("music name1:", name);
});

player.on("start", name => {
  console.log("music name2:", name);
});

player.once("start", name => {
  console.log("once music name:", name);
});

console.log("start");

setTimeout(() => {
  console.log("异步事件完成，进行事件驱动", "---".repeat(10));
  player.emit("start", "不能说的秘密");
  console.log("测试once事件", "---".repeat(10));
  player.emit("start", "不能说的秘密");
  console.log("测试移除消息监听", "---".repeat(10));
  player.remove("start");
  player.emit("start", "不能说的秘密");
}, 1000);

console.log("end");
