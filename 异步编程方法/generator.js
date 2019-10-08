/**
 * js 异步编程实现方式: Generator 函数
 *
 * 使用 Generator 封装异步任务
 * 函数将在 yield 阶段暂停，返回一个可以遍历的对象
 * 每次执行对象的 next() 方法，将执行 yield 方法，并将结果返回
 */

function timeout(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("generator step", name);
    }, 1000);
  });
}

/**
 * 模拟异步任务
 * 方法将在 yield 暂停，执行语法糖后面的任务
 * 执行完毕后，才会进行执行下面代码
 * 执行顺序为：
 * 1. 第一次执行 next() ,执行到 yield timeout(),
 * 2. 第二次执行 next() ,传入的参数将为 yield timeout() 的结果赋值 result，再执行接下来的打印输出
 */
function* generator() {
  const result = yield timeout();
  console.log(
    "将 next() 传入的值做为 yield timeout() 结果,赋值给 result ,值为:",
    result
  );
}

const g = generator();
const result1 = g.next();
/**
 * result1 的值为一个 Promise 对象，所以需要用 then 方法获得异步结果
 */
console.log("g.next() 第一次执行结果 :", result1);
result1.value
  .then(function(data) {
    console.log("获取 result1 Promise 对象结果", data);
    return data;
  })
  .then(function(data) {
    const result2 = g.next(data);
    console.log("g.next() 第二次执行结果 :", result2);
  });

/** 
 * 打印输出
start
g.next() 第一次执行结果 : { value: Promise { <pending> }, done: false }
result1 Promise 对象返回结果 generator step
result : 2
end
g.next() 第二次执行结果 : { value: undefined, done: true }
 */
