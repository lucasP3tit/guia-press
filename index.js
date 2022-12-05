const { urlencoded } = require("body-parser");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const categoriesRouters = require("./categories/CategoriesController");
const articlesRouters = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View Engine
app.set("view engine", "ejs");

//Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Static
app.use(express.static("public"));

//Database
connection.authenticate()
          .then(()=>{console.log("Database connected")})
          .catch(err=>console.log("Database connection error: ", err));

          
//Routers
app.use("/", [
    categoriesRouters,
    articlesRouters
])

//Routes
app.get("/", (req, res)=>{
    Article.findAll({
        order:[["id", "DESC"]],
        limit: 4
    })
    .then(articles => {
        Category.findAll()
        .then(categories => {
            res.render("index", { articles: articles, categories: categories })
        })
    })   
    .catch(err=> console.log("An error occurred when loading articles: ", err));
});

app.get("/article/:slug", (req, res)=>{
    let slug = req.params.slug
    Article.findOne({
        where:{slug: slug}
    })
    .then(article=>{
        Category.findAll()
        .then(categories =>{
            res.render("article", { article: article, categories: categories}); 
        })
        
    })
    .catch(err=>console.log("An error occured when try to load article: ", err));
});

app.get("/category/:slug", (req, res)=>{
    let slug = req.params.slug;
    Category.findOne({
        where:{slug: slug},
        include: [{ model: Article }]
    })
    .then(category =>{
        if(category){
            Category.findAll()
            .then(categories =>{
                res.render("index", { articles: category.tb_articles, categories: categories})
            })
        }else{
            res.redirect("/");
        }
    })
    .catch(err=>{
        res.redirect("/");
    })
});

//Server
app.listen(8081, ()=>{
    console.log("Server Running");
});
