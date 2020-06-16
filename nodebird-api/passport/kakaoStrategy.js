const KaKaoStrategy = require("passport-kakao").Strategy;

const { User } = require("../models");

// /auth/kakao -> 카카오 로그인 -> /auth/kakao/callback으로 프로필반환 과정
// 카카오로그인 과정 (2) (4)
module.exports = (passport) => {
    passport.use(
        new KaKaoStrategy(
            {
                clientID: process.env.KAKAO_ID, // 카카오 앱 아이디
                callbackURL: "/auth/kakao/callback", // 카카오 리다이렉트 주소
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const exUser = await User.findOne({
                        where: {
                            snsId: profile.id,
                            provider: "kakao",
                        },
                    });
                    if (exUser) {
                        done(null, exUser);
                    } else {
                        const newUser = await User.create({
                            email: profile._json && profile._json.kakao_account.email,
                            nick: profile._json.kakao_account.profile.nickname,
                            snsId: profile.id,
                            provider: "kakao",
                        });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
