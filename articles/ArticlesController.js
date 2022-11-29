const express = require("express");
const router = express.Router();
const Article = require("./Article");
const slugify = require("slugify");
const Category = require("../categories/Category");


router.get("/admin/articles", (req, res)=>{

    Article.findAll({
        include: [{
            model: Category
        }]
    })
    .then(articles=>{
        res.render("admin/articles/index", {articles:articles})
    });
    
});

router.get("/admin/article/new", (req, res)=>{
    Category.findAll({order: [["title", "ASC"]]})
    .then(categories =>{
        res.render("admin/articles/new", {categories : categories});
    })
    .catch(err => console.log("An error occur when loading categories: ", err));
});

router.post("/admin/article/save", (req, res)=>{
    let title = req.body.title;
    let body = req.body.body;
    let category = req.body.category;

    Article.create({
        title:title,
        slug: slugify(title),
        body: body,
        tbCategoryId: category
    })
    .then(()=>res.redirect("/admin/articles"))
});

router.post("/admin/article/delete/:id", (req, res)=>{
    let id = req.params.id;
    let article = Article.findOne({where:{id:id}});
    if(article){
       Article.destroy({where:{id:id}})
                .then(()=> res.redirect("/admin/articles"))
                .catch(err=>console.log("An error occurs when try to delete article"));
    }
    console.log("Article id doesn't exist");
});

module.exports = router;