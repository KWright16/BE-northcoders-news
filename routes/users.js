const userRouter = require('express').Router();
const { getSingleUser } = require('../controllers/users')

userRouter.route('/:username')
    .get(getSingleUser);

module.exports = userRouter;
