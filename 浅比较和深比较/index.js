/**
 * 浅比较：比较2个值双方是否来自同一个对象的引用
 * === 就是浅比较
 */
const m = [1, 2, 3, 4];
const n = m;

console.log("引用地址相同比较 :", m === n);

const m1 = { count: 1 };
const n1 = m1;
n1.count++;
console.log("引用对象内部值修改比较 :", m1 === n1);
console.log("n1 :", n1);
console.log("m1 :", m1);

const m4 = { count: 4 };
const n4 = { count: 4 };
n4.count++;
console.log("值相同，但是引用的对象不同 :", m4 === n4);

const m2 = { count: 1 };
const n2 = { ...m2 };
n2.count++;
console.log("采用扩展运算符创建新的对象比较 :", m2 === n2);
console.log("n2 :", n2);
console.log("m2 :", m2);

/*
 * 深比较：比较对象内的每个属性是否相等
 * 一般采用递归的方法，对对象内的每个属性进行对比，比较耗时
 */
function deepEqual(value1, value2) {
  // 判断类型
  if (typeof value1 === "object" && typeof value2 === "object") {
    for (const key in value1) {
      if (value1.hasOwnProperty(key)) {
        const item = value1[key];
        if (typeof item === "object") {
          const result = deepEqual(item, value2[key]);
          if (!result) {
            return result;
          }
        } else {
          if (item !== value2[key]) {
            return false;
          }
        }
      }
    }
    return true;
  } else {
    return value1 === value2;
  }
}

const value1 = [1, { a: 1 }];
const value2 = [1, { a: 2 }];
const value3 = [1, { a: 2 }];
console.log(" 数组深度递归比较:", deepEqual(value1, value2));
console.log(" 数组深度递归比较:", deepEqual(value2, value3));

const value4 = { a: 1, b: [1, 3] };
const value5 = { a: 1, b: [1, 2] };
const value6 = { a: 1, b: [1, 2] };
console.log(" 对象深度递归比较:", deepEqual(value4, value5));
console.log(" 对象深度递归比较:", deepEqual(value5, value6));
