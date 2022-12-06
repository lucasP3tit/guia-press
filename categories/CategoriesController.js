const express = require("express");
const Category = require("./Category");
const router = express.Router();
const slugify = require("slugify");
const adminAuth = require("../middlewares/adminAuth");

 router.get("/admin/categories", adminAuth, (req, res)=>{
   Category.findAll({order:[["id","DESC"]]})
   .then(categories =>{
      res.render("admin/categories/index", {categories: categories});
   })
   .catch(err => console.log("Error to get categories: ", err));
 });

 router.get("/admin/category/new", adminAuth, (req, res)=>{
    res.render("admin/categories/new")
 })

 router.post("/category/save", adminAuth, (req, res)=>{
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

 router.post("/admin/category/delete/:id", adminAuth, (req, res)=>{
      let id = req.params.id;
      let category = Category.findOne({where:{id:id}});
      if(category){
         Category.destroy({where:{id:id}})
                  .then(()=> res.redirect("/admin/categories"))
                  .catch(err=>console.log("An error occurs when try to delete category"));
      }
      console.log("Category id doesn't exist");
 });

 router.get("/admin/category/edit/:id", adminAuth, (req, res)=>{
   let id = req.params.id;
   if(!isNaN(id)){
      Category.findOne({where:{id:id}}).then(category=>{
         if(category){
            res.render("admin/categories/edit", {category:category});
         }else{
            res.redirect("/admin/categories");
         }
      }).catch(err=>{
         res.redirect("/admin/categories");
      })
   }else{
      res.redirect("/admin/categories");
   }
 });

 router.post("/admin/category/update/:id", adminAuth, (req, res)=>{
   let id =req.params.id;
   let title = req.body.title;

   if(!isNaN(id)){
      Category.update({title:title, slug: slugify(title)}, {where:{id:id}})
               .then(category=>{
                  if(category){
                     res.redirect("/admin/categories");
                  }else{
                     res.redirect("/admin/category/edit/"+id);
                  }
               })
               .catch(err=>{
                  res.redirect("/admin/category/edit/"+id);
               });
   }else{
      res.redirect("/admin/category/edit/"+id);
   }
 })

 module.exports = router;

 