const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const { Post, User } = require("../models");

router.get("/profile", isLoggedIn, (req, res) => {
    res.render("profile", { title: "내 정보 - NodeBird", user: req.user });
});

router.get("/join", isNotLoggedIn, (req, res) => {
    res.render("join", {
        title: "회원가입 - NodeBird",
        user: req.user,
        joinError: req.flash("joinError"),
    });
});

router.get("/", (req, res, next) => {
    Post.findAll({
        include: [
            {
                // 작성자
                model: User,
                attributes: ["id", "nick"],
            },
            {
                // 좋아요 누른 사람들
                model: User,
                attributes: ["id", "nick"],
                as: "Liker",
            },
        ],
        order: [["createdAt", "DESC"]],
    })
        .then((posts) => {
            res.render("main", {
                title: "NodeBird",
                twits: posts,
                user: req.user,
                loginError: req.flash("loginError"),
            });
        })
        .catch((error) => {
            console.error(error);
            next(error);
        });
});

// router.get("/", async (req, res, next) => {
//     try {
//         const posts = await Post.findAll({
//             include: {
//                 model: User,

//                 attributes: ["id", "nick"],
//             },

//             order: [["createdAt", "DESC"]],
//         });

//         res.render("main", {
//             title: "Nodebird",

//             twits: posts,

//             user: req.user,

//             loginError: req.flash("loginError"),
//         });
//     } catch (err) {
//         console.error(err);

//         next(err);
//     }
// });

module.exports = router;
