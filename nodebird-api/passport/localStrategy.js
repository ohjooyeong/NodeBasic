const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("../models");

// urlencoded 미들웨어가 해석한 req.body의 값들을 usernameField, passwordField에 연결합니다
module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "email", // req.body.email
                passwordField: "password", // req.body.password
            },
            // done (에러, 성공, 실패)
            // done(서버에러), done(null, 사용자 정보), done(null, false, 실패정보)
            async (email, password, done) => {
                try {
                    const exUser = await User.findOne({ where: { email } });
                    // 이메일 검사
                    if (exUser) {
                        // 비밀번호 검사
                        const result = await bcrypt.compare(password, exUser.password);
                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
                        }
                    } else {
                        done(null, false, { message: "가입되지 않은 회원입니다." });
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
