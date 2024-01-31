const mongoose = require('mongoose');
const Listing = require("../models/listing");
const initdata = require("./data")

const DB_URL = 'mongodb://127.0.0.1:27017/wanderlust';
async function main(){
    await mongoose.connect(DB_URL);
}

main()
.then(()=>{
    console.log("Connected Successfully")
})
.catch((err)=>{
    console.log(err)
})

const initDB = async() =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("Data was initialized")
};

initDB();