const Listing=require("../model/listing.js");
// const mbxGeocoding=require("@mapbox/mapbox-sdk/services/geocoding");
// const mapToken=process.env.MAP_TOKEN;
// const geocodingClient=mbxGeocoding({accessToken:mapToken})

//index route

module.exports.index=async(req,res)=>{
   const allListings= await Listing.find({});
   res.render("listings/index.ejs",{allListings});
    }

    //new form render
module.exports.renderNewform=(req,res)=>{
    res.render("listings/new.ejs");
 }

 //show listings
 module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");
    if(!listing){
        req.flash("error","listing not found");
       return res.redirect("/listings")
    }
    res.render("listings/show.ejs",{listing});
}

//create listing
module.exports.createListing=async(req,res,next)=>{ 

   // let response=await geocodingClient.forwardGeocode({query:"New Delhi,India",limit:1})
   // .send();
   // console.log(response);
   // res.send()
   let url=req.file.path;
   let filename=req.file.filename
   const newListing= new Listing(req.body.listing);
   newListing.owner=req.user._id;
   newListing.image={url,filename};
   await newListing.save();
   req.flash("success","New listing created");
   res.redirect("/listings");
}

//edit listing
module.exports.editListing=async(req,res)=>{
     let {id}=req.params;
    const listing=await Listing.findById(id);
     if(!listing){
        req.flash("error","listing not found");
       return res.redirect("/listings")
    }
    let originalImgUrl=listing.image.url
    originalImgUrl= originalImgUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listing,originalImgUrl});
}

//update listing
module.exports.updateRoute=async(req,res)=>{
    
    let {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing})

   if(typeof req.file !== "undefined"){
   let url=req.file.path;
   let filename=req.file.filename
   listing.image={url,filename};
   await listing.save();
   }
    req.flash("success","Listing was Updated");
    res.redirect(`/listings/${id}`);
}

//delete listing
module.exports.deleteListing=async(req,res)=>{
    let {id}=req.params;
   let deletedListing=await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success","Listing deleted");
   res.redirect("/listings");

}