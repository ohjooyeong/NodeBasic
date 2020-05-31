const http = require("http");
const fs = require("fs");

const users = {};

const router = {
    get: {
        "/": (req, res) => {
            fs.readFile("./restFront.html", (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        },
        "/users": (req, res) => {
            res.end(JSON.stringify(users));
        },
        "/about": (req, res) => {
            fs.readFile("./about.html", (err, data) => {
                if (err) {
                    throw err;
                }
                res.end(data);
            });
        },
        "*": (req, res) => {
            fs.readFile(`.${req.url}`, (err, data) => {
                if (err) {
                    res.writeHead(404, "NOT FOUND");
                    return res.end("NOT FOUND");
                }
                return res.end(data);
            });
        },
    },
    post: {
        "/users": (req, res) => {
            let body = "";
            req.on("data", (data) => {
                body += data;
            });
            req.on("end", () => {
                console.log("POST 본문(Body):", body);
                const { name } = JSON.parse(body);
                const id = Date.now();
                users[id] = name;
                res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
                res.end("사용자 등록 성공");
            });
        },
    },
    patch: {},
    put: {
        "/users": (req, res) => {
            const id = req.url.split("/")[2];
            let body = "";
            req.on("data", (data) => {
                body += data;
            });
            return req.on("end", () => {
                console.log("PUT 본문(Body):", body);
                users[id] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        },
    },
    delete: {
        "/users": (req, res) => {
            const id = req.url.split("/")[2];
            delete users[id];
            return res.end(JSON.stringify(users));
        },
    },
};

http.createServer((req, res) => {
    console.log(req.method, req.url);
    let urls = req.url;
    if (req.method === "DELETE") {
        urls = "/users";
    } else if (req.method === "PUT") {
        urls = "/users";
    }
    const matchedUrl = router[req.method.toLowerCase()][urls];
    // 디폴트 오퍼레이터
    (matchedUrl || router[req.method.toLowerCase()]["*"])(req, res);
}).listen(8085, () => {
    console.log("8085번 포트에서 서버 대기중입니다");
});
