const seedDB = require('./seed');
const mongoose = require('mongoose');
const DB_URL = process.env.NODE_ENV === 'production' ? process.env.DB_URL : require('../config')
const rawData = process.env.NODE_ENV === 'test' ? require('./testData/index') : require('./devData/index')

mongoose.connect(DB_URL)
.then(() => {
    return seedDB(rawData);
})
.then(() => {
    console.log('Done!')
    mongoose.disconnect();
})
.catch(console.log)