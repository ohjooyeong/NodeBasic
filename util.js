const util = require("util");
const crypto = require("crypto");

// 지원이 조만간 중단될 메서드임을 알려줄 떄 사용합니다.
const dontuseme = util.deprecate((x, y) => {
    console.log(x + y);
}, "이 함수는 2018년 12월 부로 지원하지 않습니다.");

dontuseme(1, 2);

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString("base64");
    console.log("salt", salt);
    console.time("암호화");
    crypto.pbkdf2("insang", salt, 500000, 64, "sha512", (err, key) => {
        console.log("password", key.toString("base64"));
        console.timeEnd("암호화");
    });
});

// promise를 지원하지 않는 (err, data) => {} 꼴의 콜백은 util.promisify로 프로미스로 만들수 있다.
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

randomBytesPromise(64)
    .then((buf) => {
        const salt = buf.toString("base64");
        return pbkdf2Promise("insang", salt, 65030, 64, "sha512");
    })
    .then((key) => {
        console.log("password", key.toString("base64"));
    })
    .catch((err) => {
        console.error(err);
    });

async () => {
    const buf = await randomBytesPromise(64);
    const salt = buf.toString("base64");
    const key = await pbkdf2Promise("insang", salt, 65030, 64, "sha512");
};
