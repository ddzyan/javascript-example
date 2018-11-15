const path =require('path');

//将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃，就像是在terminal中使用cd命令一样。
const resolvePath = path.resolve('../path');

//join只是简单的拼接
const joinPath = path.join('../path');

console.log(`resolvePath:`, resolvePath); // resolvePath: C:\work\workSpace\github\javascript-example\node\path
console.log(`joinPath:`, joinPath); // joinPath: ..\path
