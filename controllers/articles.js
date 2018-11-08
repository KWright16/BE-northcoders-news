const { Article, Comment } = require('../models/index')

const getArticles = (req, res, next) => {
    console.log('got to controller')
    Article.find()
    .then(articles => {
        res.status(200).send({articles})
    })
    .catch(next)
};

const getSingleArticle = (req, res, next) => {
    const { article_id } = req.params;
    Article.findById(article_id)
    .then(article => {
        if (!article)
            Promise.reject({
                status: 404, 
                msg: `Article not found for ID: ${article_id}`
            })
        res.status(200).send({article})
    })
    .catch(next)
};
const getArticleComments = (req, res, next) => {
    const { article_id } = req.params;
    Comment.find({ belongs_to: article_id })
    .then((comments) => {
        if (!comments)
            Promise.reject({
                status: 404,
                msg: `Comments not found for ID: ${article_id}`
            })
        res.status(200).send({comments})
    })
    .catch(next)
};
const addArticle = () => {};
const updateArticle = () => {};

module.exports = { 
    getArticles, 
    getSingleArticle, 
    getArticleComments, 
    addArticle, 
    updateArticle
};