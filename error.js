process.on("uncaughtException", (err) => {
    console.error("예기치 못한 에러", err);
});

setInterval(() => {
    throw new Error("서버 고장");
}, 1000);

setTimeout(() => {
    console.log("실행됩니다.");
}, 2000);

// const fs = require("fs");

// setInterval(() => {
//     console.log("시작");
//     fs.unlink("./asfa.js", (err) => {
//         if (err) {
//             console.log("시작");
//             console.log(err);
//             console.log("끝");
//         }
//     });
// }, 1000);

// try {
//     throw new Error("서버 고장");
// } catch (error) {
//     console.error(error);
// }
