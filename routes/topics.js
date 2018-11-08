const topicRouter = require('express').Router();
const { getTopics, getArticleInTopic, addArticleToTopic } = require('../controllers/topics')

topicRouter.route('/')
    .get(getTopics);
topicRouter.route('/:topic_slug/articles')
    .get(getArticleInTopic)
//     .post(addArticleToTopic);

module.exports = topicRouter;
