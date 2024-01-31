const express = require("express");
const app = express();
const port = 1111;
const mongoose = require('mongoose');
const Listing = require("./models/listing")

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


app.get('/',(req,res)=>{
    res.send("I am root");
})
app.get('/testllisting', async (req,res)=>{
    let sampleListing = new Listing({
        title: "Kunal",
        description:"Beach",
        price: 150,
        location: "Gwal",
        country: "India"
    });
    await sampleListing.save();
    console.log("sample was saved")
    res.send("Successful testing")
});

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})