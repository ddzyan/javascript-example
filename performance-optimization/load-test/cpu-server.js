/**
 * CPU密集型任务，将导致主线程堵塞
 * 无法再接收其他请求
 */

const http = require("http");

function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

const server = http.createServer((req, res) => {
  /* setTimeout(() => {
    res.end("hello word");
    console.log("耗时 :", Date.now() - starttime);
  }, 2000); */
  const result = fib(30);
  res.end(result.toString());
});

server.listen(3000, () => {
  console.log("服务启动成功");
});
