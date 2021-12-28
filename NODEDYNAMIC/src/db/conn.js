const mongoose = require("mongoose");

//creating a database
mongoose.connect("mongodb://localhost:27017/newdynamic", {
    useUnifiedTopology: true,
    useNewUrlParser: true}).then( () => console.log("connection successful...."))
    .catch((err) => console.log(err));
