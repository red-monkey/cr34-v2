const mongoose = require('mongoose')

const advocateSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    referralNumber:{
        type:Number,
    }
})


module.exports = mongoose.model('Advocate', advocateSchema)