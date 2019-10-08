/**
 * 基于 Promise 对象的自动执行
 */

function timeout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('setTimeout');
      resolve('爱你中国');
    }, 1000);
  });
}

function* generator() {
  const r1 = yield timeout();
  console.log('r1 :', r1);
  const r2 = yield timeout();
  console.log('r2 :', r2);
}

function run() {
  const g = generator();
  let i = 1;
  function next(data) {
    console.log('i :', i++);
    const r1 = g.next(data);
    if (r1.done) return;
    r1.value.then(next);
  }

  next();
}

run(generator);
