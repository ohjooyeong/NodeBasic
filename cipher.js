const crypto = require("crypto");

const cipher = crypto.createCipher("aes-256-cbc", "열쇠");
// createCipher
// utf8 평문을 base64 암호문으로 만들어라
let result = cipher.update("insang", "utf8", "base64");
result += cipher.final("base64");
console.log("암호", result);

const decipher = crypto.createDecipher("aes-256-cbc", "열쇠");
// createDecipher
// base64 암호문을 uft8 평문으로 만들어라
let result2 = decipher.update(result, "base64", "utf8");
result2 += decipher.final("utf8");

console.log("평문", result2);
