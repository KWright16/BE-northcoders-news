const { Comment } = require("../models/index");
const { updateVote } = require("../utils/controllerUtils");

const deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  Comment.findByIdAndRemove(comment_id)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const updateComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { vote } = req.query;

  return updateVote(Comment, comment_id, vote)
    .then(comment => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: `Comment not found for ID: ${comment_id}`
        });
      }
      return res.status(202).send({ comment });
    })
    .catch(next);
};

module.exports = { deleteComment, updateComment };
