const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const { User } = require("../models");

module.exports = (passport) => {
    // 세션 메모리에 id값만 저장
    // { id:1, name: ohjoo, age:26 } -> 1
    // user.id가 req.session.passport.user에 저장
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    // 세션 메모리에서 id를 받아와서 정보값을 복구
    // 1 -> { id:1, name: ohjoo, age:26 } -> req.user
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ["id", "nick"],
                    as: "Followers",
                },
                {
                    model: User,
                    attributes: ["id", "nick"],
                    as: "Followings",
                },
            ],
        })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });
    local(passport);
    kakao(passport);
};

// let users = [ ] ;

// passport.deserializeUser((id, done) => {

//     let result = users.indexOf(id);

//     if (result === -1) { // result가 -1이라면 === 배열에 아이디 없다.

//       User.findOne({ where: { id } }) // 유저 아이디가 있는지 db에서 검색해라.
//       .then((user) => done(null, user)) // 검색이 성공했다면, 결과를 파라미터에
//       .then(()=>users.push(id)) // 그리고 배열에 아이디를 추가해라.
//       .catch((err) => done(err));

//     } else { // result가 -1이 아니라면, 배열안에 아이디가 있다.

//       done(null,users[result]);

//     }

//   });
