process.stdin.resume(); //这句话是为了不让控制台推出
process.on('SIGINT', function () { //SIGINT这个信号是系统默认信号，代表信号中断，就是ctrl+c
  console.log('Got SIGINT.  Press Control-D to exit.');
  
});

process.on('uncaughtException', (err) => {
    console.log(err);
});

nonexistentFunc();
