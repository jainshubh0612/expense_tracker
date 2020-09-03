const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const color = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')

const transaction = require('./routes/transactions')
const connectDb = require('./db')

dotenv.config({
    path:'./config/config.env'
})

const app = express()

connectDb()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('/api/v1/transaction',transaction)

const port = process.env.PORT || 5000
app.listen(port , ()=>{
    console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold)
})