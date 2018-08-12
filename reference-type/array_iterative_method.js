//数组的所有迭代方法，将不对原始数组进行操作，不影响原始数组的值

const numbers = [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1];

//检查数组中全部项，判断是否存在大于5的项
const everyResult = numbers.every(function (item, index, array) {
    if (item > 5) {
        return false;
    }
})

//由于存在一个返回false，则最终返回false
console.log(`everyResult :${everyResult}`);

//检测数组中全部项，判断是否存在有大于2的项
const someResult = numbers.some(function (item, index, array) {
    if (item > 2) {
        return true;
    }
})

//只要一个项返回true，则最终返回true
console.log(`someResult ：${someResult}`);

//对数组中全部项执行过滤方法，将返回true的项组成一个新下数组返回
const filterResult = numbers.filter(function (item, index, array) {
    if (item > 4) {
        return true;
    }
})

//console.log打印数组，将会执行数组的toString方法进行输出
console.log(`filterResult ：${filterResult}`);

//检查数组中的全部项，对每个项目执行指定方法，没有返回值
const forEachResult = numbers.forEach(function (item, index, array) {
    if (item > 4) {
        return item + 1;
    }
})

console.log(`forEachResult ${forEachResult}`);

//检查数组中的全部项，对每个项目执行指定方法，将函数执行的结果组成一个新的数组返回
const mapResult = numbers.map(function (item, index, array) {
    return item + 1;
})

console.log(`mapResult ${mapResult}`);
