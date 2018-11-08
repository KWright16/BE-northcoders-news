const { User } = require('../models/index')

const getSingleUser = (req, res ,next) => {
    console.log('got to controller')
    const { username } = req.params;
    User.findOne({username: username})
    .then(user => {
        res.status(200).send({user})
    })
    .catch(next)
};

module.exports = { getSingleUser }