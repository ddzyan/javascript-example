// 监听未被处理的promise异常（异步）
process.on('uncaughtException', (err) => {
    console.log(err);
    process.exit(1);
});

setTimeout(() => {
    console.log('这里仍然会运行。');
}, 500);

// 故意调用一个不存在的函数，应用会抛出未捕获的异常。
nonexistentFunc();
console.log('这里不会运行。');