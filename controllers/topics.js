const { Topic, Article } = require("../models/index");
const { getCommentCount } = require("../utils/controllerUtils");

const getTopics = (req, res, next) => {
  Topic.find()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};
const getArticleInTopic = (req, res, next) => {
  const { topic_slug } = req.params;
  Article.find({ belongs_to: topic_slug })
    .populate("created_by")
    .lean()
    .then(articles => {
      if (!articles.length)
        return Promise.reject({
          status: 404,
          msg: `Articles not found for topic: ${topic_slug}`
        });
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

const addArticleToTopic = (req, res, next) => {
  const { topic_slug } = req.params;
  Article.create({ ...req.body, belongs_to: topic_slug })
    .then(article => {
      return Article.findById(article.id)
        .populate("created_by")
        .lean();
    })
    .then(article => {
      return getCommentCount(article);
    })
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};
module.exports = { getTopics, getArticleInTopic, addArticleToTopic };
