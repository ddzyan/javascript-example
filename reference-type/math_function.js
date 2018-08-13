const max = 9;
const min = 2;
let i = 0;

while (i < 20) {
    // Math.floor(Math.random() * 可能值的总数 + 第一个可能的值)，根据整个公式改造
    const value = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(value);
    i++;
}
