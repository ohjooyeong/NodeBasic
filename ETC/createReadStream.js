// 버퍼들의 흐름은 스트림

const fs = require("fs");

const readStream = fs.createReadStream("./readme3.txt", { highWaterMark: 16 });
const data = [];

// 스트림은 이벤트 기반으로 동작한다. data, end, error 버퍼들이 들어올 때마다 data이벤트가 발생
readStream.on("data", (chunk) => {
    data.push(chunk);
    console.log("data", chunk, chunk.length, chunk.toString());
});

readStream.on("end", () => {
    console.log("end", Buffer.concat(data).toString());
});

readStream.on("error", (err) => {
    console.log("error", err);
});
// 스트림은 버퍼의 흐름이기 때문에 여러 개의 스트림을 이어 버퍼가 흘러가게 할 수 있습니다.
