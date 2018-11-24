const commentRouter = require("express").Router();
const { deleteComment, updateComment } = require("../controllers/comments");

commentRouter
  .route("/:comment_id")
  .delete(deleteComment)
  .put(updateComment);

module.exports = commentRouter;
