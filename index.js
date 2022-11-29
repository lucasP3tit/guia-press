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
    Article.findAll({order:[["id", "DESC"]]})
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
        res.render("article", { article: article}); 
    })
    .catch(err=>console.log("An error occured when try to load article: ", err));
});

app.listen(8081, ()=>{
    console.log("Server Running");
});
