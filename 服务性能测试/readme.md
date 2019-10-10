## 简介

了解 nodejs 代码在 CPU 密集任务和 IO 密集任务的运行流程。nodejs 就是靠 v8 引擎 实现事件驱动，异步非堵塞 I/O，才从一堆 js 语言中脱颖而出。而实现异步 I/O 的方式不止，回调函数一种，相关方法请查看：[js 异步编程实现方法](http://www.zmscode.cn/2019/10/09/js%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B%E5%AE%9E%E7%8E%B0%E6%96%B9%E6%B3%95/)

### CPU 密集任务

在执行需要 CPU 计算的耗时任务时，会导致主线程卡死，等待计算结果。此时主线程将无法处理其他任务，导致无法接收新的请求，影响用户体验。测试代码：sync-server.js

测试

```shell
# 启动服务
node ./sync-server.js
```

并发测试

```shell
npm i -g loadtest

loadtest -c 2 -n 2 http://localhost:3000
```

### I/O 任务

在执行 I/O，计时器等异步任务时，主线程会把任务推进 event-loop 线程中进行处理。此时主线程可以继续执行其他任务，接收其他请求。等待异步任务完成，将通知主线程，继续执行代码，返回结果。
测试

```shell
# 启动服务
node ./async-server.js
```

并发测试

```shell
npm i -g loadtest

loadtest -c 2 -n 2 http://localhost:3001
```
