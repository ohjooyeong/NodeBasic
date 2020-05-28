const crypto = require("crypto");

crypto.randomBytes(64, (err, buf) => {
    const salt = buf.toString("base64");
    console.log("salt", salt);
    console.time("암호화");
    // 해시 충돌 공격을 어렵게 하기 위해 salt라는 문자열을 원래 비밀번호에 추가하고 iteration 횟수를 높입니다.
    crypto.pbkdf2("insang", salt, 500000, 64, "sha512", (err, key) => {
        console.log("password", key.toString("base64"));
        console.timeEnd("암호화");
    });
});
