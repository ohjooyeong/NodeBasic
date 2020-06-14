const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { User } = require("../models");

const router = express.Router();

// rotuer.get(미들웨어1, 미들웨어2, 미들웨어3)
// POST /auth/join
router.post("/join", isNotLoggedIn, async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        const exUser = await User.findOne({ where: { email } });
        if (exUser) {
            req.flash("joinError", "이미 가입된 이메일입니다.");
            return res.redirect("/join");
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// POST /auth/login
router.post("/login", isNotLoggedIn, (req, res, next) => {
    // req.body.email, req.body.password
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            req.flash("loginError", info.message);
            return res.redirect("/");
        }
        // req.user 에서 사용자 정보를 찾을 수 있다. (세션에 저장)
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect("/");
        });
    })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
    req.logout();
    res.redirect("/");
});

// kakaoStrategy가 실행되게하는 라우터
// 카카오로그인 과정 (1)
router.get("/kakao", passport.authenticate("kakao"));

// 카카오로그인 과정 (3)
router.get(
    "/kakao/callback",
    passport.authenticate("kakao", {
        failureRedirect: "/",
    }),
    (req, res) => {
        res.redirect("/");
    }
);

module.exports = router;
