const { Topic, Article } = require('../models/index')
const { getCommentCount } = require('../utils/controllerUtils')

const getTopics = (req, res, next) => {
    Topic.find()
    .then(topics => {
        res.status(200).send({topics})
    })
    .catch(next)
};
const getArticleInTopic = (req, res ,next) => {
    const { topic_slug } = req.params;
    Article.find({ belongs_to: topic_slug })
    .populate('created_by', 'name-_id')
    .lean()
    .then((articles) => {
        return Promise.all(articles.map(article => {            
            return getCommentCount(article)
        }))
    })
    .then(articles => {
        if (!articles.length)
            return Promise.reject({
                status: 404, 
                msg: `Articles not found for topic: ${topic_slug}`
        })
        res.status(200).send({articles})
    })
    .catch(next)
};
const addArticleToTopic = (req, res, next) => {
    const { topic_slug } = req.params;    
    const article = new Article({...req.body, belongs_to: topic_slug})    
    article.save()
    .then(article => {        
        res.status(201).send({article})
    })
    .catch(next)
    
};

module.exports = { getTopics, getArticleInTopic, addArticleToTopic }