// 函数返回值注释


/**
 * 普通返回值类型和说明
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} sum of a and b
 */
function sum(a, b) {
  return a + b
}



/**
 * 多个返回值类型
 *
 * @param {number} a
 * @param {number} b
 * @param {boolean} retArr 如果retArr 为true 则返回数组，否则返回数字类型
 * @returns {(number|Array)} 返回数字或者数组类型
 */
function multipleType(a, b, retArr) {


}

/**
 * Promise类型返回值
 *
 * @param {number} a
 * @param {number} b
 * @returns {Promise<number>} sum of a and b
 */
function promiseType(a, b) {
  return new Promise(function (resolve, reject) {
    resolve(a + b)
  })
}