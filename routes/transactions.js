const express = require('express')
const router = express.Router()

const Transaction = require('../models/Transactions')

const getTransaction =async (req,res,next) => {
    try{
       const transactions = await Transaction.find() 

       return res.status(200).json({
           success:true,
           count:transactions.length,
           data:transactions
       })

    }catch(err){
        return res.json(501).json({
            success:false,
            erroe:'Server Error'
        })
    }
}

const addTransaction =async (req,res,next) => {
    try{
         const {text,amount} = req.body 
         const transaction = await Transaction.create(req.body)
         
         return res.status(201).json({
            success:true,
            data:transaction 
        })
 
     }catch(err){
         if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            res.status(400).json({
                success:true,
                error:messages
            })
         }else{
            return res.json(501).json({
                success:false,
                erroe:'Server Error'
            })
         }
         
     }
}

const deleteTransaction =async (req,res,next) => {
    
    const id = req.params.id

    try{
        const transaction = await Transaction.findById(id)
        if(!transaction){
            return res.status(404).json({
                success:false,
                data:"No transaction found"
            })
        }
        await transaction.remove();
        return res.status(200).json({
            success:true,
            data:{}
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            error:"Server error"
        })
    }
}

router
    .route('/')
    .get(getTransaction)
    .post(addTransaction)

router
    .route('/:id')
    .delete(deleteTransaction)
    


module.exports = router 