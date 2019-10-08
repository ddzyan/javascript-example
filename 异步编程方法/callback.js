/**
 * js 异步编程实现方法：回调函数(callback)
 * 将 setTimeout 的执行结果分为 2 部分
 * 第一步部分立即返回状态，不堵塞同步线程运行
 * 第二部分将 计时器 丢到 事件循环 中
 * 事件循环 持续循环遍历，时间到则通过回调函数，让主线程执行
 */

function f1() {
  console.log("f2 end");
}

function f2(cb) {
  setTimeout(() => {
    cb();
  }, 1000);
}

console.log("start");
f2(f1);
console.log("end");
