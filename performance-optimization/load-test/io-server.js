/**
 * 遇到I/O任务时，主线程会把任务推进 event-loop 线程 中
 * 然后执行其他任务，此时可以接收其他请求
 * 等待 event-loop 线程遍历处理中，发行任务完成，将继续执行任务，返回结果
 */

const http = require("http");

/* function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
} */

const server = http.createServer((req, res) => {
  res.end("hello word");
});

server.listen(3000, () => {
  console.log("服务启动成功");
});
