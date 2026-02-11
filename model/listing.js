const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { types } = require("joi");


const listingSchema =new Schema({
    title:{
        type:String, 
        require:true,
    },
    description:String,
    image:{
        filename:{
        type:String,
        default: "https://plus.unsplash.com/premium_photo-1761924338811-a6f031ab228c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
        },
        url:{
            type:String,
            default: "https://plus.unsplash.com/premium_photo-1761924338811-a6f031ab228c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
        
        set:(v)=>v === ""? "https://plus.unsplash.com/premium_photo-1761924338811-a6f031ab228c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" : v,
    },
},
    price: {
  type: Number,
  
},
    location:String, 
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
    await Review.deleteMany({_id:{$in : listing.reviews}})
    }

})
const Listing=mongoose.model("Listing",listingSchema);

module.exports=Listing;