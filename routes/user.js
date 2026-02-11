const express=require("express");
const route=express.Router();
// const User=require("../model/user.js");
const User=require("../model/user.js");
const wrapAsyn=require("../utils/wrapAsyn.js");
const passport = require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const userController=require("../controllers/users.js");

//rendersignUp page 
route.get("/signup",userController.renderSignupPage); 


//actual signUp work here -->
route.post("/signup",wrapAsyn(userController.signup));

route.get("/login",userController.renderLoginPage)


//actual login work here -->
route.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login);

//logout work here -->
route.get("/logout",userController.logout);

module.exports=route;