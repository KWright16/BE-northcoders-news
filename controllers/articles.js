const { Article, Comment } = require('../models/index')
const { getCommentCount } = require('../utils/controllerUtils')

const getArticles = (req, res, next) => {
    Article.find()
    .populate('created_by', 'name-_id') /* remove second argument to access full object*/
    .lean()
    .then((articles) => {
        return Promise.all(articles.map(article => {            
            return getCommentCount(article)
        }))
    })
    .then(articles => {
        res.status(200).send({articles})
    })
    .catch(next)
};

const getSingleArticle = (req, res, next) => {
    const { article_id } = req.params;
    Article.findById(article_id)
    .populate('created_by', 'name-_id')
    .lean()
    .then((article) => {
        return Promise.all([
            article,
            Comment.find({ belongs_to: article_id })
        ])
    })
    .then(([article, comments]) => {            
        const comment_count = comments.length 
        if (!article)
            return Promise.reject({
                status: 404, 
                msg: `Article not found for ID: ${article_id}`
            });                    
        article = {
            ...article,
            comment_count: comment_count
        };                   
        res.status(200).send({article})
    })
    .catch(next)
};
const getArticleComments = (req, res, next) => {
    const { article_id } = req.params;
    Comment.find({ belongs_to: article_id })
    .populate('created_by', 'name-_id')
    .populate('belongs_to', 'title-_id')
    .then((comments) => {
        if (comments.length === 0)
            return Promise.reject({
                status: 404,
                msg: `Comments not found for ID: ${article_id}`
            })
        res.status(200).send({comments})
    })
    .catch(next)
};
const addArticleComment = (req, res, next) => {
    const { article_id } = req.params;
    Comment.create({...req.body, belongs_to: article_id})
    .then(comment => {
        res.status(201).send({comment})
    })
    .catch(next)
};
const updateArticle = (req, res, next) => {
    const { article_id } = req.params;
    const { vote } = req.query
    return Article.findById(article_id)
    .then((oldArticle) => {      
        vote === 'up' ? oldArticle.votes += 1 : oldArticle.votes -= 1;         
        return oldArticle
        // return Article.findByIdAndUpdate(article_id, {votes: oldArticle.votes + 1}) 
    })
    .then(article => {
        return res.status(202).send({article})
    })
    .catch(next)
};

module.exports = { 
    getArticles, 
    getSingleArticle, 
    getArticleComments, 
    addArticleComment, 
    updateArticle
};