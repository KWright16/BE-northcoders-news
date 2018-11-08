const { Topic, Article } = require('../models/index')

const getTopics = (req, res, next) => {
    console.log('got to controller')
    Topic.find()
    .then(topics => {
        res.status(200).send({topics})
    })
    .catch(next)
};
const getArticleInTopic = (req, res ,next) => {
    const { topic_slug } = req.params;
    Article.find({ belongs_to: topic_slug })
    .then(articles => {
        res.status(200).send({articles})
    })
    .catch(next)
};
const addArticleToTopic = () => {};

module.exports = { getTopics, getArticleInTopic, addArticleToTopic }