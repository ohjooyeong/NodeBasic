const express = require("express");
const jwt = require("jsonwebtoken");

const { verifyToken, apiLimiter } = require("./middlewares");
const { Domain, User, Post, Hashtag } = require("../models");

const router = express.Router();

router.post("/token", apiLimiter, async (req, res) => {
    const { clientSecret } = req.body;
    try {
        const domain = await Domain.findOne({
            where: { clientSecret },
            include: {
                model: User,
                attribute: ["nick", "id"],
            },
        });
        if (!domain) {
            return res.status(401).json({
                code: 401,
                message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요",
            });
        }
        const token = jwt.sign(
            {
                id: domain.user.id,
                nick: domain.user.nick,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1m", // 1분
                issuer: "nodebird",
            }
        );
        return res.json({
            code: 200,
            message: "토큰이 발급되었습니다.",
            token,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: "서버 에러",
        });
    }
});

router.get("/test", apiLimiter, verifyToken, (req, res) => {
    res.json(req.decoded);
});

router.get("/posts/my", apiLimiter, verifyToken, (req, res) => {
    Post.findAll({
        where: { userId: req.decoded.id },
    })
        .then((posts) => {
            res.json({
                code: 200,
                payload: posts,
            });
        })
        .catch((error) => {
            console.error(error);
            return res.status(500).json({
                code: 500,
                message: "서버에러",
            });
        });
});

router.get("/posts/hashtag/:title", apiLimiter, verifyToken, async (req, res) => {
    try {
        // 해시태그를 찾고
        const hashtag = await Hashtag.findOne({ where: { title: req.params.title } });
        // 없으면 없다고 리턴
        if (!hashtag) {
            return res.status(404).json({
                code: 404,
                message: "검색 결과가 없습니다.",
            });
        }

        //있으면 있다고 포스트와 같이 리턴
        const posts = await hashtag.getPosts();
        return res.json({
            code: 200,
            payload: posts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: "서버에러",
        });
    }
});

router.get("/follow", apiLimiter, verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.decoded.id } });
        // attributes로 가져오고 싶은 데이터를 정할 수 있음.
        const follower = await user.getFollowers({ attributes: ["id", "nick"] });
        const following = await user.getFollowings({ attributes: ["id", "nick"] });
        return res.json({
            code: 200,
            follower,
            following,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: "서버에러",
        });
    }
});

module.exports = router;
