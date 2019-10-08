/**
 * 使用 thunk 函数包装 generator 函数，实现自动流程管理
 */

/**
 * Thunk 函数转换器
 * 将多参数函数，转换为只接受一个回调函数的单参数函数
 * 1. 传入一个多参数的函数 fn (最后一个参数为回调函数)，返回一个函数
 * 2. 执行上面函数，将传入的所有参数进行保存，再返回一个函数
 * 3. 执行上面函数，参数为一个回调函数。 将 2 步骤的参数和回调函数进行组装，传入 fn 执行
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
  console.log('r1 data :', data);
  const r2 = g.next(data);
  r2.value(function(data) {
    console.log('r2 data :', data);
  });
});

/**
 * 基于 Thunk 函数的 Generator 执行器，实现自动的流程管理
 * 1. 执行 generator 函数,返回一个可遍历的执行对象 gen
 * 2. 内部定义 thunk 函数 next() ,参数为上一个 yield 的结果 data
 * 3. 遍历执行 gen.next() ,传入 data
 * 4. 判断 result.done 是否已经执行完毕，有跳出
 * 5. 没有则执行 result.value：此时value值为接收一个回调函数的函数
 * 6. 支持遍历，直到无法遍历为止
 */
function run(fn) {
  const gen = fn();

  function next(data) {
    const result = gen.next(data);
    console.log('result :', result);
    if (result.done) return;
    result.value(next);
  }

  next();
}

run(generator);
