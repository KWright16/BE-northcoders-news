const { Comment } = require("../models/index");

const getCommentCount = article => {
  return Comment.find({ belongs_to: article._id }).then(comments => {
    const comment_count = comments.length;
    article = {
      ...article,
      comment_count: comment_count
    };
    return article;
  });
};
const updateVote = (model, id, vote) => {
  return model.findByIdAndUpdate(
    id,
    vote === "up"
      ? { $inc: { votes: 1 } }
      : vote === "down"
      ? { $inc: { votes: -1 } }
      : null,
    { new: true }
  );
};

module.exports = { getCommentCount, updateVote };
