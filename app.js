const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');
const DB_URL = require('./config');

mongoose.connect(DB_URL)
.then(() => {
    console.log('connected okay!')
})

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use((err,req,res,next) => {
    console.log(err)
    res.status(500).send({err})
})

module.exports = app;