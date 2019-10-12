需要了解的内容有：

1. 什么数据的监测和分析来了解系统瓶颈
2. 同步问题如何分析
   1. 什么是火焰图
   2. 火焰图的 X 和 Y 轴代表着什么
   3. 案例分析
3. 异步问题如何分析

代码仓库：https://github.com/ddzyan/javascript-example/tree/master/performance-optimization/optimization

## 简介

在系统上线之前，有时候我们需要对系统进行压力测试，了解系统最大的并发量是多少，在测试的过程中观察系统资源瓶颈，针对性进行代码优化。

下面的内容为记录一次实际操作的代码性能分析和优化过程。

### clinic

clinic 是一个能够帮助诊断和查明 nodejs 性能的工具。它总共提供了如下三种功能：

- doctor
- flame
- bubbleprof

```shell
npm install -g clinic
```

#### doctor

使用 doctor 可以了解到系统的 CPU 使用率，垃圾收集情况，事件循环延迟 和 活动句柄数量 。从整体上了解系统资源使用情况，分析问题出现在哪里。

在进行压力测试的时候，我选择了同一个作者开发的工具:autocannon，但是这并不是绝对的，你也可以使用 ab,loadtest 等。

##### 操作

```shell
clinic doctor --on-port 'autocannon localhost:$PORT/fib?m=38' -- node child-process-cpu-server.js
┌───────────┬─────┬──────┬───────┬───────┬───────┬───────┬───────┐
│ Stat      │ 1%  │ 2.5% │ 50%   │ 97.5% │ Avg   │ Stdev │ Min   │
├───────────┼─────┼──────┼───────┼───────┼───────┼───────┼───────┤
│ Req/Sec   │ 0   │ 0    │ 1     │ 1     │ 0.6   │ 0.49  │ 1     │
├───────────┼─────┼──────┼───────┼───────┼───────┼───────┼───────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 211 B │ 211 B │ 127 B │ 103 B │ 211 B │
└───────────┴─────┴──────┴───────┴───────┴───────┴───────┴───────┘

Req/Bytes counts sampled once per second.

6 requests in 10.06s, 1.27 kB read
4 errors (4 timeouts)
```

![image](http://www.zmscode.cn/mdImages/doctor.png)
根据直接打开的测试结果网页，可以了解 4 个信息的数据图表和系统的诊断结果，当前的结果为：可能有一个或多个长时间运行的同步操作阻塞了线程

```shell
Doctor has found a potential Event Loop issue:
There may be one or more long running synchronous operations blocking the thread
Mitigate: Implement HTTP 503 event-loop protection
Diagnose: Use clinic flame to discover CPU intensive function calls – run clinic flame -h to get started
```

根据结果我们可以再使用 flame(火焰图) ，对系统调用栈的函数所消耗的 CPU 进行分析，了解具体出问题的地方在哪里。

#### flame

![image](http://www.zmscode.cn/mdImages/clipboard2.png)

火焰图是用来分析系统调用栈的 CPU 耗时情况，它的 X，Y 轴分别代表如下信息：

- X 轴：代表着调用栈的 CPU 消耗时间，X 轴越长，代表着占用的 CPU 的时间越长。
- Y 轴：代表着全部的调用栈，每一层都是一个函数，调用栈越深，火焰图越高。顶部就是正在执行的函数，下一个函数是它的父函数，存在调用关系。

我们在进行分析火焰图的时候，可以观察顶层哪个函数所占用的宽度越长，就可以表示这个函数可能存在问题。

##### 实例分析

![image](http://www.zmscode.cn/mdImages/clipboard.png)

从 Y 轴分析：a()函数存在 2 个分支，则代表着函数内存在一个判断语句。

从 X 轴分析：

- b()分支消耗的 CPU 大于 h()。
- b()和 c()基本不消耗 CPU
- g()消耗 CPU 最多的，d()的宽度最宽，但是它直接消耗 CPU 的时间很少。
- 分析问题首先要调查 g()函数，其次是 i()函数

##### 实操

配合压力测试工具，autocannon 进行压力测，并且通过 clinic 记录测试时间内的调用栈函数的 CPU 消耗时间

这里进行压力测试的配置是：

- 负载测试配置:10 个并发量，每个每秒发送 1 个请求，持续时间为 10 秒。
- 测试的接口包含了一段复杂的算法

结果的 TPS 为 0.5，平均每个请求消耗的时间为 5282.6 ms

```shell
clinic flame --on-port 'autocannon localhost:$PORT/fib?m=38' -- node ./child-process-cpu-server.js
┌─────────┬─────────┬─────────┬─────────┬─────────┬───────────┬────────────┬────────────┐
│ Stat    │ 2.5%    │ 50%     │ 97.5%   │ 99%     │ Avg       │ Stdev      │ Max        │
├─────────┼─────────┼─────────┼─────────┼─────────┼───────────┼────────────┼────────────┤
│ Latency │ 1637 ms │ 5338 ms │ 8978 ms │ 8978 ms │ 5282.6 ms │ 2609.17 ms │ 8978.88 ms │
└─────────┴─────────┴─────────┴─────────┴─────────┴───────────┴────────────┴────────────┘
┌───────────┬─────┬──────┬─────┬───────┬───────┬───────┬───────┐
│ Stat      │ 1%  │ 2.5% │ 50% │ 97.5% │ Avg   │ Stdev │ Min   │
├───────────┼─────┼──────┼─────┼───────┼───────┼───────┼───────┤
│ Req/Sec   │ 0   │ 0    │ 0   │ 1     │ 0.5   │ 0.5   │ 1     │
├───────────┼─────┼──────┼─────┼───────┼───────┼───────┼───────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 0 B │ 211 B │ 106 B │ 106 B │ 211 B │
└───────────┴─────┴──────┴─────┴───────┴───────┴───────┴───────┘

Req/Bytes counts sampled once per second.

5 requests in 10.05s, 1.05 kB read
```

结果如图：
![image](http://www.zmscode.cn/mdImages/flame1.png)
根据图中分析结果 fib() 函数耗用了大量的 CPU，我们要观察下 .\child-process-cpu-server.js 22 行-25 行代码所执行的 fib 函数内容，

```js
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}
```

这是一个斐波那契数列计算，它的计算难度会根据传入的数值，大幅度的提升。由于它长时间的占用 CPU 导致主线程卡死，异步回调无法继续执行导致系统 TPS 量变低

###### 优化

这里我们降低传入的参数，再进行一次测试，获得 TPS 为 12921，比较上一次有大幅度的提升，所以要限制传入的数值大小。

```shell
clinic flame --on-port 'autocannon localhost:$PORT/fibm=10' -- node ./child-process-cpu-server.js

┌─────────┬──────┬──────┬───────┬──────┬─────────┬─────────┬──────────┐
│ Stat    │ 2.5% │ 50%  │ 97.5% │ 99%  │ Avg     │ Stdev   │ Max      │
├─────────┼──────┼──────┼───────┼──────┼─────────┼─────────┼──────────┤
│ Latency │ 0 ms │ 0 ms │ 1 ms  │ 1 ms │ 0.09 ms │ 0.42 ms │ 24.96 ms │
└─────────┴──────┴──────┴───────┴──────┴─────────┴─────────┴──────────┘
┌───────────┬─────────┬─────────┬─────────┬─────────┬────────┬─────────┬─────────┐
│ Stat      │ 1%      │ 2.5%    │ 50%     │ 97.5%   │ Avg    │ Stdev   │ Min     │
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┤
│ Req/Sec   │ 7175    │ 7175    │ 13487   │ 13855   │ 12921  │ 1930.86 │ 7172    │
├───────────┼─────────┼─────────┼─────────┼─────────┼────────┼─────────┼─────────┤
│ Bytes/Sec │ 2.83 MB │ 2.83 MB │ 5.33 MB │ 5.47 MB │ 5.1 MB │ 763 kB  │ 2.83 MB │
└───────────┴─────────┴─────────┴─────────┴─────────┴────────┴─────────┴─────────┘

Req/Bytes counts sampled once per second.

0 2xx responses, 129208 non 2xx responses
129k requests in 10.1s, 51 MB read
Analysing data
Generated HTML file is .clinic\22320.clinic-flame.html
You can use this command to upload it:
clinic upload .clinic\22320.clinic-flame
```

![image](http://www.zmscode.cn/mdImages/flame2.png)
到这里同步优化结束
