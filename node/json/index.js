const people = {
  name: 'ddz',
  age: 13
  /* toJSON() {
    return 's';
  } */
};

const replacer = function(key, value) {
  if (typeof value === 'string') {
    return undefined;
  }

  return value;
};

// 正常输出
console.log(JSON.stringify(people));
// 自定义缩进用的空白字符串数量
console.log(JSON.stringify(people, null, 2));
// 只显示数组内指定属性
console.log(JSON.stringify(people, ['name'], 2));
// 使用自定义的过滤器
console.log(JSON.stringify(people, replacer, 2));
