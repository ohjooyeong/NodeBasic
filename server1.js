const http = require("http");
// const fs = require("fs");

const parseCookies = (cookie = "") =>
    cookie
        .split(";")
        .map((v) => v.split("="))
        .map(([k, ...vs]) => [k, vs.join("=")])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const server = http
    .createServer((req, res) => {
        console.log(req.url, parseCookies(req.headers.cookie));
        res.writeHead(200, { "Set-Cookie": "mycookie=test" });
        res.end("Hello Cookie");
        console.log("서버 실행");
        // fs.readFile("./server2.html", (err, data) => {
        //     if (err) {
        //         throw err;
        //     }
        //     res.end(data);
        // });
    })
    .listen(8080);
server.on("listening", () => {
    console.log("8080번 포트에서 서버 대기중입니다.");
});
server.on("error", (error) => {
    console.error(error);
});
