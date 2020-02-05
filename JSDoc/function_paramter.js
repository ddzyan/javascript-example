
/**
 * 对象参数注释
 * @description 方法参数注释内容包含对象内的属性类型，名称和注解
 * @param {Object} employee - employee
 * @param {String} employee.name - The name of the employee.
 * @param {string} employee.age - The name of the employee.
 * @returns {Number} 
 */
function abc({ name, age }) {
  return 123;
}


/**
 * 普通参数注释
 * @description 方法参数注释内容包含 类型，名称，注解
 * @param {string} somebody - 用户名称
 */
function sayHello(somebody) {

}

/**
 * 数组参数注释
 * @description 方法参数注释内容包含数组
 * @param {Object[]} cats - 这是一个猫类型数组
 * @param {string} cats[].name - 猫名字
 * @param {Number} cats[].age - 猫年龄
 */
function arrayParamter(cats) {

}

/**
 * 参数包含默认值
 * @description 在注释中体现包含默认值的参数
 * @param {string} [name=Ddz]  - 用户名称
 */
function defaultParamter(name) {

}

/**
 * 两种参数类型
 * @description 参数包含2种类型的代码注释
 * @param {string|string[]} somebody - 用户
 */
function mutilsParamter(somebody) {

}
