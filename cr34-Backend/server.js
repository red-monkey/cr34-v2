require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")

const app = express();


mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())
app.use(cors())


const predictionsRouter = require('./routes/predictions')
app.use('/predictions' , predictionsRouter)

const advocatorsRouter = require('./routes/advocators')
app.use('/advocators' , advocatorsRouter)

app.listen(8000, () => {console.log("server starter on port 8000")})