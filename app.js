const app = require('express')();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const mongoose = require('mongoose');
const DB_URL = process.env.NODE_ENV === 'production' ? process.env : require('./config')

mongoose.connect(DB_URL)
.then(() => {
    console.log('connected okay!')
})

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
    res.status(404).send("Page not found");
})

app.use((err, req ,res ,next) => {    
    if(err.name === 'CastError') err.status = 400;
    res.status(err.status).send({msg: err.message || err.msg});
});

module.exports = app;