const articleRouter = require('express').Router();
const { getArticles, 
    getSingleArticle, 
    getArticleComments, 
    addArticle, 
    updateArticle } = require('../controllers/articles')

articleRouter.route('/')
    .get(getArticles);
articleRouter.route('/:article_id')
    .get(getSingleArticle)
articleRouter.route('/:article_id/comments')
    .get(getArticleComments)
module.exports = articleRouter;
