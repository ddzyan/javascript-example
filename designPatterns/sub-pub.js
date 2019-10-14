/**
 * 发布/订阅模式
 */

class Player {
  constructor() {
    this._events = Object.create(null);
  }

  emit(name, ...args) {
    if (name in this._events) {
      this._events[name].forEach(element => {
        element(...args);
      });
    }
  }

  listener(name, cb) {
    if (!(name in this._events)) {
      this._events[name] = [];
    }
    this._events[name].push(cb);
  }

  remove(name) {
    if (name in this._events) {
      delete this._events[name];
    }
  }
}

const player = new Player();
player.listener("start", name => {
  console.log("start:", name);
});

player.remove("start");

player.listener("start", name => {
  console.log("start2:", name);
});

player.emit("start", "周杰伦");
