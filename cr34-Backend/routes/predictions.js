const express = require('express')
const router = express.Router()
const Prediction = require('../models/prediction')

//Getting all
router.get('/', async (req,res) => {
    try{
        const predictions = await Prediction.find()
        res.json(predictions)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})
//Getting one
router.get('/:id',getPrediction,(req,res) => {
    res.json(res.prediction)
})
//Creating one
router.post('/', async (req,res) => {
    const prediction = new Prediction({
        fullName:req.body.fullName,
        email:req.body.email,
        prediction:req.body.prediction
    })

    try{
        const newPrediction = await prediction.save()
        res.status(201).json(newPrediction)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})



async function getPrediction(req, res, next) {
    let prediction
    try {
        prediction = await Prediction.findById(req.params.id)
      if (prediction == null) {
        return res.status(404).json({ message: 'Cannot find prediction' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.prediction = prediction
    next()
  }

module.exports = router