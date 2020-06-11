#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// [0]은 노드 설치된 경로 [1]은 현재 실행하고 있는 경로 [2]부턴 사용자가 작성한 내용
let rl;
let type = process.argv[2];
let name = process.argv[3];
let directory = process.argv[4] || ".";

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Template</title>
</head>
<body>
  <h1>Hello</h1>
  <p>CLI</p>
</body>
</html>`;

const routerTemplate = `const express = require('express');
const router = express.Router();
 
router.get('/', (req, res, next) => {
   try {
     res.send('ok');
   } catch (error) {
     console.error(error);
     next(error);
   }
});
 
module.exports = router;`;

const exist = (dir) => {
    try {
        fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (e) {
        return false;
    }
};

const mkdirp = (dir) => {
    const dirname = path
        .relative(".", path.normalize(dir))
        .split(path.sep)
        .filter((p) => !!p); // html/css/js/zerocho => [css, js, zerocho]
    dirname.forEach((d, idx) => {
        const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
        if (!exist(pathBuilder)) {
            fs.mkdirSync(pathBuilder);
        }
    });
};

// html  html/css/js/zerocho   [css, js, zerocho]

const makeTemplate = () => {
    mkdirp(directory);
    if (type === "html") {
        const pathToFile = path.join(directory, `${name}.html`);
        if (exist(pathToFile)) {
            console.error("이미 해당 파일이 존재합니다");
        } else {
            fs.writeFileSync(pathToFile, htmlTemplate); // 한 번만 실행되는 경우에는 Sync메서드를 써도 되지만 여러 번 동시에 호출 될 것 같으면 쓰지 않는다
            console.log(pathToFile, "생성 완료");
        }
    } else if (type === "express-router") {
        const pathToFile = path.join(directory, `${name}.js`);
        if (exist(pathToFile)) {
            console.error("이미 해당 파일이 존재합니다");
        } else {
            fs.writeFileSync(pathToFile, routerTemplate);
            console.log(pathToFile, "생성 완료");
        }
    } else {
        console.error("html 또는 express-router 둘 중 하나를 입력하세요");
    }
};

const dirAnswer = (ans) => {
    directory = (ans && ans.trim()) || ".";
    rl.close();
    makeTemplate();
};

const nameAnswer = (ans) => {
    if (!ans || !ans.trim()) {
        console.clear();
        console.log("name을 반드시 입력하셔야 합니다.");
        return rl.question("파일명을 설정하세요", nameAnswer);
    }
    name = ans;
    return rl.question("저장할 경로를 설정하세요.(설정하지 않으면 현재경로)", dirAnswer);
};

const typeAnswer = (ans) => {
    if (ans !== "html" && ans !== "express-router") {
        console.clear();
        console.log("html 또는 express-router만 지원합니다");
        return rl.question("어떤 템플릿이 필요하십니까?", typeAnswer);
    }
    type = ans;
    return rl.question("파일명을 설정하세요.", nameAnswer);
};

const program = () => {
    if (!type || !name) {
        rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.clear();
        rl.question("어떤 템플릿이 필요하십니까?", typeAnswer);
    } else {
        makeTemplate();
    }
};
program();
