const express = require("express");
const Category = require("./Category");
const router = express.Router();
const slugify = require("slugify");

 router.get("/admin/categories", (req, res)=>{
   Category.findAll({order:[["id","DESC"]]})
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
         }).then(()=>res.redirect("/admin/categories"))
      }else{
         res.redirect("/admin/category/new");
      }
 });

 router.post("/admin/category/delete/:id", (req, res)=>{
      let id = req.params.id;
      let category = Category.findOne({where:{id:id}});
      if(category){
         Category.destroy({where:{id:id}})
                  .then(()=> res.redirect("/admin/categories"))
                  .catch(err=>console.log("An error occurs when try to delete category"));
      }
      console.log("Category id doesn't exist");
 });

 module.exports = router;