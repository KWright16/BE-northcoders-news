const { Article, Comment } = require("../models/index");
const { getCommentCount, updateVote } = require("../utils/controllerUtils");

const getArticles = (req, res, next) => {
  Article.find()
    .populate("created_by")
    .lean()
    .then(articles => {
      return Promise.all(
        articles.map(article => {
          return getCommentCount(article);
        })
      );
    })
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

const getSingleArticle = (req, res, next) => {
  const { article_id } = req.params;
  Article.findById(article_id)
    .populate("created_by")
    .lean()
    .then(article => {
      if (!article)
        return Promise.reject({
          status: 404,
          msg: `Article not found for ID: ${article_id}`
        });
      return getCommentCount(article);
    })
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};
const getArticleComments = (req, res, next) => {
  const { article_id } = req.params;
  Comment.find({ belongs_to: article_id })
    .populate("created_by")
    .populate("belongs_to", "title")
    .then(comments => {
      if (comments.length === 0)
        return Promise.reject({
          status: 404,
          msg: `Comments not found for ID: ${article_id}`
        });
      res.status(200).send({ comments });
    })
    .catch(next);
};
const addArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  Comment.create({ ...req.body, belongs_to: article_id })
    .then(comment => {
      return Comment.findById(comment.id)
        .populate("created_by")
        .populate("belongs_to", "title")
        .lean();
    })
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
const updateArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { vote } = req.query;

  return updateVote(Article, article_id, vote)
    .then(article => {
      if (!article) {
        return Promise.reject({
          status: 404,
          msg: `Article not found for ID: ${article_id}`
        });
      }
      return res.status(202).send({ article });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getSingleArticle,
  getArticleComments,
  addArticleComment,
  updateArticle
};
