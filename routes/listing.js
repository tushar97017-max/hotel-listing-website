const express=require("express");
const route=express.Router();
const wrapAsyn=require("../utils/wrapAsyn.js");
const Listing=require("../model/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");

//uplode img
const multer=require("multer");
const {storage}=require("../cloudeConfig.js");
const upload=multer({storage})



  

//index route
route.get("/",wrapAsyn(listingController.index));







//new route
 route.get("/new",isLoggedIn,listingController.renderNewform);

//show route
route.get("/:id",wrapAsyn(listingController.showListing));

//create route
route.post("/",isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsyn(listingController.createListing));

//edit route
route.get("/:id/edit",isLoggedIn,isOwner,wrapAsyn(listingController.editListing))

//update route
route.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsyn(listingController.updateRoute))

//delete route
route.delete("/:id",isLoggedIn,isOwner,wrapAsyn(listingController.deleteListing));


module.exports = route;
