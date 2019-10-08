/**
 * 异步编程实现方法：Promise对象
 * 采用链式调用的方式，避免回调函数种出现的回调地狱问题
 * 但是代币依旧十分冗余
 */

function f1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("f1 step1");
    }, 1000);
  });
}

console.log("start");
f1()
  .then(result => {
    console.log(result);
    return "f1 step2";
  })
  .then(result => {
    console.log(result);
  });
console.log("end");
