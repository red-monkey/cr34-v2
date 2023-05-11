const mongoose = require('mongoose')

const predictionSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    prediction:{
        type: String,
        required:true
    }
})


module.exports = mongoose.model('Prediction', predictionSchema)