/**
 * 使用多线程，解决处理CPU密集型任务导致主线程卡死的问题
 *
 * 创建 work.js 处理 fibo 函数，处理完毕后，将结果通过消息发布的方式通知主线程，继续执行
 * 子进程通讯方式为 process.send(),process.on()
 *
 * 主线程启动子进程 work.js 处理，进行消息订阅监听子进程处理结果，接收到通知则继续处理。
 * 主线程通讯方式为 const work = fork('要运行的模块地址')，work.on(),work.send()
 *
 * 订阅消息后，此时主线程不需要一直等待结果，而是由 event-loop 进行遍历监听，主线程将不会卡死
 */
const { fork } = require("child_process");
const express = require("express");
const app = express();

function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

app.get("/fib", function(req, res) {
  const result = fib(req.query.m || 1);
  res.send(result.toString());
  /* const work = fork("./work.js");
  work.on("message", m => {
    console.log("master 接收到返回结果 :", m);
    if (typeof m === "object" && m.type === "fib") {
      work.kill();
      res.send(m.data.toString());
      console.log("耗时 :", Date.now() - startTime);
    }
  });

  work.on("close", (numver, signal) => {
    console.log("work 退出", numver, signal);
  });
  // 子进程收到的内容为 { type: "fib", data: "" }
  work.send({ type: "fib", data: req.query.m || 1 }); */
});

app.get("/", function(req, res) {
  res.send("hello word");
});

app.listen(3002, () => {
  console.log("服务启动成功");
});
