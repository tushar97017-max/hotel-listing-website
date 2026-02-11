const express=require("express");
const route=express.Router({mergeParams: true});
const wrapAsyn=require("../utils/wrapAsyn.js");
const ExpressError=require("../utils/ExpressError.js");

const Review=require("../model/review.js"); 
const Listing=require("../model/listing.js");
const reviewController=require("../controllers/reviews.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js")

//review

//post route

route.post("/",isLoggedIn,validateReview, wrapAsyn(reviewController.createReview))

//delete route
route.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsyn(reviewController.deleteReview));

module.exports = route;
