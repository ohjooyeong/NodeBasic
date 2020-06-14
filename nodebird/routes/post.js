const express = require("express");
const multer = require("multer");
const path = require("path");
const { Post, Hashtag, User } = require("../models");
const { isLoggedIn } = require("./middlewares");

const router = express.Router();

const upload = multer({
    // storage: 어디에 저장할지의 방법
    storage: multer.diskStorage({
        // destination: 파일 경로 cb(에러, 결괏값)
        destination(req, file, cb) {
            cb(null, "uploads/");
        },
        // filename: 파일명
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    // 파일 사이즈 리밋
    limit: { fileSize: 5 * 1024 * 1024 },
});
// single: 이미지 하나(필드명) array: 이미지 여러 개(단일 필드), fields: 이미지 여러 개(여러 필드), none:이미지 X
router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
    // multer로 업로드 했을때는 req.file에 저장되있음. (보통 폼으로 업로드 했을때는 보통 req.body에 있음)
    console.log(req.body, req.file);
    res.json({
        url: `/img/${req.file.filename}`,
    });
});

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), async (req, res, next) => {
    // 게시글 업로드
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            userId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s]*/g);
        if (hashtags) {
            // findOrCreate: DB에 있으면 찾고 없으면 새로 생성
            const result = await Promise.all(
                hashtags.map((tag) =>
                    Hashtag.findOrCreate({
                        where: { title: tag.slice(1).toLowerCase() },
                    })
                )
            );
            // A.getB: 관계있는 로우 조회, A.addB: 관계 생성, A.setB: 관계 수정, A.removeB: 관계 제거
            // 게시글과 해시태그 저장한 것을 연결해주는 힘수
            await post.addHashtags(result.map((r) => r[0]));
        }
        res.redirect("/");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get("/hashtag", async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect("/");
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            posts = await hashtag.getPosts({ include: [{ model: User }] });
        }
        return res.render("main", {
            title: `${query} | NodeBird`,
            user: req.user,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
