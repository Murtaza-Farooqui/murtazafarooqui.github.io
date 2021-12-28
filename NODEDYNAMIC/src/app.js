const express = require("express");
const path = require("path");
require('./db/conn');
const hbs = require("hbs");
const { registerPartials } = require("hbs");
const User = require("./models/usermessage");
const res = require("express/lib/response");
const async = require("hbs/lib/async");

const app = express();
const port = process.env.PORT || 3000;


// setting the path
const staticpath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");


// middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath));
// setting and telling to express that i am using view engine
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialPath);

//routing
app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/about", (req,res)=>{
    res.render("about");
})

app.get("/service", (req,res)=>{
    res.render("service");
})

app.get("/newsletter", (req,res)=>{
    res.render("newsletter");
})


app.post("/contact", async(req,res) => {
    try {
        //res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (error) {
        res.status(500).send(error);
    }

})

//listening
app.listen(port, ()=> {
    console.log(`listening to the port no ${port}`);
})