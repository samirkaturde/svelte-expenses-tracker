const express = require('express');
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

const {port, mongoURI} = require('./config')
const transactionsRoutes = require('./routes/transaction')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then((result)=>{
        console.log(" DB Connection Done ")
    })
    .catch((err)=>{
        console.log(" DB Connection has error ", err)
    })

app.use('/api/transactions', transactionsRoutes)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/public'))
    app.get('*', (req, res)=> {
        res.sendFile(path.resolve(__dirname, 'client','public','index.html') )
    })
}

app.listen(port,()=>{
    console.log(" Server is running on port : ", port)
})