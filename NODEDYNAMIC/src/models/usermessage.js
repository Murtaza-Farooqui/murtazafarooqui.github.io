const mongoose = require("mongoose");
const validator = require("validator");

// get data that user written in form
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:3
    },
    email : {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email ID")
            }
        }
    },
    message: {
        type: String,
        minLength:3
    },
})

// we need to create a collection

const User = mongoose.model('User', userSchema);

module.exports = User;