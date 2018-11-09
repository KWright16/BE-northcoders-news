const articleRouter = require('express').Router();
const { getArticles, 
    getSingleArticle, 
    getArticleComments, 
    addArticleComment, 
    updateArticle } = require('../controllers/articles')

articleRouter.route('/')
    .get(getArticles);
articleRouter.route('/:article_id')
    .get(getSingleArticle)
    .put(updateArticle)
articleRouter.route('/:article_id/comments')
    .get(getArticleComments)
    .post(addArticleComment)
module.exports = articleRouter;
