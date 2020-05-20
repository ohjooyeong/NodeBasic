const { odd, even } = require("./var");
const checkNumber = require("./func"); // 변수명을 바꿀 수 있음

function checkStringOddOrEven(str) {
    if (str.length % 2) {
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
console.log(global);
