const express = require("express");
const Category = require("./Category");
const router = express.Router();
const slugify = require("slugify");

 router.get("/admin/categories", (req, res)=>{
   Category.findAll()
   .then(categories =>{
      res.render("admin/categories/index", {categories: categories});
   })
   .catch(err => console.log("Error to get categories: ", err));
 });

 router.get("/admin/category/new", (req, res)=>{
    res.render("admin/categories/new")
 })

 router.post("/category/save", (req, res)=>{
      let title = req.body.title;
      if(title){
         Category.create({
            title: title,
            slug: slugify(title)
         }).then(()=>res.redirect("/"))
      }else{
         res.redirect("/admin/category/new");
      }
 });

 router.get("/admin/categories", (req, res)=>{

 })
 module.exports = router;