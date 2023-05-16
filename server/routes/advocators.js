const express = require('express')
const router = express.Router()
const Advocate = require('../models/advocate')
const shortid = require('shortid');

//Getting all
router.get('/', async (req,res) => {
    try{
        const advocators = await Advocate.find()
        res.json(advocators)
    }catch (error){
        res.status(500).json({message:error.message})
    }
})
//Getting one by id
router.get('/:id',getAdvocate,(req,res) => {
    res.json(res.advocate)
})

//Creating one
router.post('/', async (req,res) => {
    const advocate = new Advocate({
        fullName:req.body.fullName,
        email:req.body.email,
        referralNumber:0
    })

    try{
        const newAdvocate = await advocate.save()
        res.status(201).json(newAdvocate)
    }catch(error){
        res.status(400).json({message:error.message})
    }
})

//updating one
router.patch('/:id', getAdvocate, async (req, res) => {
    if (req.body.referralNumber != null) {
        res.advocate.referralNumber = req.body.referralNumber
    }
    try {
      const updatedAdvocate = await res.advocate.save()
      res.json(updatedAdvocate)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })



async function getAdvocate(req, res, next) {
    let advocate
    try {
        advocate = await Advocate.findById(req.params.id)
      if (advocate == null) {
        return res.status(404).json({ message: 'Cannot find advocator' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.advocate = advocate
    next()
  }

module.exports = router