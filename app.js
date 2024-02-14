const express = require("express");
const app = express();
const port = 1111;
const mongoose = require('mongoose');
const Listing = require("./models/listing")
const path = require("path");
const methodOver = require("method-override")
const ejsmate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync")
const ExpressError =  require("./utils/ExpressError")


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({extended:true}));
app.use(methodOver("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"public")));

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

app.get("/listing",wrapAsync(async (req,res)=>{
    let allData = await Listing.find({});
    res.render("listings/index.ejs",{allData});
}))

app.get("/showdata/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let oneData = await Listing.findById(id);
    // console.log(oneData);
    res.render("listings/ShowOne.ejs",{oneData});
}))

app.get("/newData",(req,res)=>{
    res.render("listings/NewData.ejs");
})

app.post("/listings",wrapAsync(async (req,res,next)=>{
    // let {title,description,image , price , location , country} = req.body;
    // console.log(title ,description , image , price , location , country)
    if(!req.body.listing){
        throw new ExpressError(404, "Send valid data because you are sending empty data or invalid data")
    }
    const newListing = await new Listing(req.body.listing)
    await newListing.save();
    res.redirect("/listing")
}))

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

app.get('/edit/:id',wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let e = await Listing.findById(id);
    res.render('listings/editform.ejs',{e})
}))

app.put("/updating/:id", wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(404, "Send valid data because you are sending empty data or invalid data");
    }
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/showdata/${id}`);
})
)
app.delete("/delt/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing")
}))

// * when user given path not matches above paths
app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Your Path is not correct. Please check"))
})


//error handling MW
app.use((err,req,res,next)=>{
    let {statusCode = 500 , message = "This error message will reflect when error occurs but express error message not given otherwise express error message will display"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("Err.ejs", {message});
})

app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})

