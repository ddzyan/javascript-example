console.log("子线程已经启动");
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

process.on("message", m => {
  console.log("work 接收到参数 :", m);
  if (typeof m === "object" && m.type === "fib") {
    const result = fib(m.data);
    process.send({ type: "fib", data: result });
  }
});

/* process.on("exit", function(code) {
  // TODO 这里可以主动释放其他资源 如zookeeper连接等
  if (code === 1000) {
    console.error("process:uncaughtException");
  } else if (code === 1001) {
    console.error("process:SIGINT");
  } else if (code === 1002) {
    console.error("process:SIGTERM");
  } else {
    console.error("process:unknown");
  }
});
process.on("uncaughtException", function(e) {
  console.log(e);
  // 异常可以选择不退出
  process.exit(1000);
});
process.on("SIGINT", function() {
  process.exit(1001);
});

process.on("SIGTERM", function() {
  process.exit(1002);
});

process.on("SIGHUP", () => {
  console.log("接收到退出指令");
}); */
