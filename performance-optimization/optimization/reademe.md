### 简介

性能测试结果

当前本地测试环境，最大并发数量：7

```shell
# 再提高并发数 -c 的值时，发现 Completed requests 下降
$ loadtest http://localhost:3002/ -c 7 -t 1.5
[Thu Oct 10 2019 16:57:53 GMT+0800 (China Standard Time)] INFO Requests: 0, requests per second: 0, mean latency: 0 ms
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Target URL:          http://localhost:3002/
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Max time (s):        1.5
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Concurrency level:   8
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Agent:               none
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Completed requests:  6
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Total errors:        0
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Total time:          1.5241599000000001 s
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Requests per second: 4
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Mean latency:        1264.1 ms
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO Percentage of the requests served within a certain time
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO   50%      1312 ms
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO   90%      1450 ms
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO   95%      1450 ms
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO   99%      1450 ms
[Thu Oct 10 2019 16:57:55 GMT+0800 (China Standard Time)] INFO  100%      1450 ms (longest request)
```

当前本地测试环境，每秒最多能接收的请求：2
