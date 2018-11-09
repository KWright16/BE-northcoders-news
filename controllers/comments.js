const {Comment} = require('../models/index')

const deleteComment = (req, res , next) => {
    const { comment_id } = req.params
    Comment.findByIdAndRemove(comment_id).exec()
    .then(comment => {
        res.status(200).send({comment})
    })
    .catch(next)
};

module.exports = deleteComment;