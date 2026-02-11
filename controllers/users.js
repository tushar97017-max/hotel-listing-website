const User=require("../model/user.js");


module.exports.renderSignupPage=(req,res)=>{
    res.render("users/signup.ejs");
}


module.exports.signup=async(req,res)=>{
    try{
         let {username,email,password}=req.body;
         const newUser=new User({email,username})
         const register= await User.register(newUser,password);
         console.log(register);
         req.login(register,(err)=>{
           if(err){
           return next(err);
           }
         req.flash("success","welcome to wanderlust");
         res.redirect("/listings");
         })
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginPage=(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","welcome to wanderlust you log'in");
    let redirectUrl=req.session.redirectUrl ||"/listings";
    res.redirect(redirectUrl);

}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","you are logout");
        res.redirect("/listings");
    })
}

