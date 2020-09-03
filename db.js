const mongoose = require('mongoose')
const color = require('colors')

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI , {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })

        console.log('connected with mongo'.magenta.bold)
    }catch (err){
        console.log(`Error : ${err.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB