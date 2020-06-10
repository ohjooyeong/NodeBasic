#!/usr/bin/env node
const readline = require("readline");

// 사용자와 컴퓨터간의 소통창구
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
console.clear();
const answerCallback = (ans) => {
    if (ans === "y") {
        console.log("감사합니다");
        rl.close();
    } else if (ans === "n") {
        console.log("죄송합니다.");
        rl.close();
    } else {
        console.clear();
        console.log("y 또는 n 만 입력하세요");
        rl.question("예제가 재미있습니까?(y/n)", answerCallback);
    }
};
rl.question("예제 재미있습니까?(y/n)", answerCallback);
