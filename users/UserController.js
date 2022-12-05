const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req, res) =>{
    res.send("User Router");
});

router.get("/admin/user/create", (req, res)=>{
    res.render("admin/users/new");
})

router.post("/admin/user/save", (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({
        where:{
            email:email
        }
    }
    ).then(user =>{
        if(user){
            res.redirect("/admin/user/create")
        }else{
            let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
            User.create({
                email:email,
                password: hash
            })
            .then(()=> res.redirect("/admin/users"))
            .catch(err=> res.redirect("/"));
        }

    })
});

module.exports = router;