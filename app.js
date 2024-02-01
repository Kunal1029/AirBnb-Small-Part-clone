const express = require("express");
const app = express();
const port = 1111;
const mongoose = require('mongoose');
const Listing = require("./models/listing")
const path = require("path");
const methodOver = require("method-override")

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));
app.use(methodOver("_method"));

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
app.get("/listing",async (req,res)=>{
    let allData = await Listing.find({});
    res.render("listings/index.ejs",{allData});
})

app.get("/showdata/:id",async (req,res)=>{
    let {id} = req.params;
    let oneData = await Listing.findById(id);
    // console.log(oneData);
    res.render("listings/ShowOne.ejs",{oneData});
})

app.get("/newData",(req,res)=>{
    res.render("listings/NewData.ejs");
})

app.post("/listings",async (req,res)=>{
    // let {title,description,image , price , location , country} = req.body;
    // console.log(title ,description , image , price , location , country)
    const newListing = await new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listing")
})

// app.get('/testllisting', async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "Kunal",
//         description:"Beach",
//         price: 150,
//         location: "Gwal",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log("sample was saved")
//     res.send("Successful testing")
// });

// edit

app.get('/edit/:id',async (req,res)=>{
    let {id} = req.params;
    let e = await Listing.findById(id);
    res.render('listings/editform.ejs',{e})
})

app.put("/updating/:id", async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/showdata/${id}`);
})

app.delete("/delt/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing")
})

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})

