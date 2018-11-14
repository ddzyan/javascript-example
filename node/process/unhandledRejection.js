//处理js未捕捉的异常（同步）
process.on('unhandledRejection', (err) => {
    console.log('--------------------------unhandledRejection');
    console.log('unhandledRejection %j', err);
});

setTimeout(() => {
    console.log('这里仍然会运行。');
}, 500);

function foo() {
    return Promise.reject('Hello, Fundebug!');
}

var r = foo();