const mongoose=require("mongoose");
const Listing=require("../model/listing.js");
const initData=require("./data.js");

const mongosh_url="mongodb://127.0.0.1:27017/wanderlust";


main()
.then(()=>{
    console.log("connection begins");
})
.catch((err) =>{
    console.log(err);

}); 
 
async function main() {
  await mongoose.connect(mongosh_url);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"691028dbc9fa447b8e5d3479"}))
    await Listing.insertMany(initData.data);
    console.log("data was insert");
}

// main()
//   .then(() => initDB())
//   .then(() => mongoose.connection.close())
//   .catch((err) => {
//     console.error("❌ Error:", err);
//   });
  initDB();