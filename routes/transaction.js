const { Router } = require('express')
const Transaction = require('../models/Transaction')

const router = Router();

router.get('/', async (req, res)=>{
    try {
        const transaction = await Transaction.find();
        if(!transaction) {
            throw new Error('No Transaction')
        }
        res.status(200).json(transaction)
    } catch(err) {
        res.status(400).json({message: err.message})
    }
})

router.post('/', async (req, res)=>{
    const {value} = req.body
    const newTransaction = new Transaction({value})
    
    try {
        const transaction = await newTransaction.save()
        if(!transaction) {
            throw new Error('There was an error saving the transaction')
        }
        res.status(200).json(transaction)
    } catch(err) {
        res.status(500).json({message: err.message})
    }
})

router.delete('/:id', async (req, res)=>{
    const { id } = req.params
    
    try {
        const transaction = await Transaction.findById(id);
        if(!transaction) {
            throw new Error('No Transaction found for this id')
        }
        const removed = await Transaction.remove({ _id: id })
        if(!removed) {
            throw new Error('There was a problem for removing the transaction')
        }
        res.status(200).json({id})
    } catch(err) {
        res.status(404).json({message: err.message})
    }
})

module.exports = router