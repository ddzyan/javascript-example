function f1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("f1 end");
    }, 1000);
  });
}

console.log("start");
f1().then(result => {
  console.log(result);
});
console.log("end");
