const express = require("express");
const router = express.Router();


router.get("/articles", (req, res)=>{
    res.send("Articles router");
});

router.get("/admin/article/new", (req, res)=>{
    res.render("admin/articles/new");
});

module.exports = router;