const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");

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
        const cookies = parseCookies(req.headers.cookies);
        if (req.url.startsWith("/login")) {
            const { query } = url.parse(req.url);
            const { name } = qs.parse(query);
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 5);
            // name은 입력한 이름, Expires는 쿠키의 유효시간, cookie의 접근방식은 웹에서만 http 자바스크립트 접근x, 루트경로에서만 유효한
            res.writeHead(302, {
                Location: "/",
                "Set-Cookie": `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
            });
            res.end();
        } else if (cookies.name) {
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            res.end(`${cookies.name}님 안녕하세요`);
        } else {
            fs.readFile("./server4.html", (err, data) => {
                res.end(data);
            });
        }
        // res.writeHead(200, { "Set-Cookie": "mycookie=test" });
        // res.end("Hello Cookie");
        // console.log("서버 실행");
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
