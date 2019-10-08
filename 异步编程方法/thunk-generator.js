/**
 * 使用 thunk 函数包装 generator 函数，实现自动流程管理
 *
 * thunkify
 */

/**
 * Thunk 函数转换器
 * 将多参数函数，转换为只接受一个回调函数的单参数函数
 * 1. 返回一个函数，参数参数为一个函数
 * 2. 执行上面函数，将传入的所有参数进行保存，再返回一个函数
 * 3. 真正执行 fn 函数，第一个参数为第第一步传入的参数为第一次传入的参数和第二次传入的回调函数
 */
function thunkify(fn) {
  return function(...args) {
    const ctx = this;

    return function(done) {
      let called = false;

      args.push(function() {
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}

function timeout(name, cb) {
  setTimeout(() => {
    cb(`generator step${name}`);
  }, 1000);
}

const timeoutThunk = thunkify(timeout);

function* generator() {
  const r1 = yield timeoutThunk(1);
  console.log(r1);
  const r2 = yield timeoutThunk(2);
  console.log(r2);
}

const g = generator();
const r1 = g.next();
r1.value(function(data) {
  console.log("r1 data :", data);
  const r2 = g.next(data);
  r2.value(function(data) {
    console.log("r2 data :", data);
  });
});

/**
 * 1. 执行generator函数
 * 2. 内部定义 thunk 函数 next()
 */
/* function run(fn) {
  const gen = fn();

  function next(data) {
    const result = gen.next(data);
    console.log("result :", result);
    if (result.done) return;
    result.value(next);
  }

  next();
}

run(generator); */
