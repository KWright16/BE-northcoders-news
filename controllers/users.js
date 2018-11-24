const { User } = require("../models/index");

const getSingleUser = (req, res, next) => {
  const { username } = req.params;
  User.findOne({ username })
    .then(user => {
      if (!user) {
        return Promise.reject({
          status: 404,
          msg: `User ${username} not found.`
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getSingleUser };
