const http = require("http");
const https = require("https");
const fs = require("fs");

http.createServer((req, res) => {
    res.end("http server");
}).listen(80);

// https는 암호화가 곁들여진거기 때문에 인증을 받아야함.
// 유료도 있고 무료도 있는데 만약 받으면 서버앞에 인증서 경로를 다 지정해야함
// lets encrypt 무료 인증서를 발급 받았다고 치면
https
    .createServer(
        {
            cert: fs.readFileSync("도메인 인증서 결로"),
            key: fs.readFileSync("도메인 비밀키 경로"),
            ca: [fs.readFileSync("상위 인증서 경로")],
        },
        (res, req) => {
            res.end("https server");
        }
    )
    .listen(443);
