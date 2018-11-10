const apiRouter = require('express').Router();
const articleRouter = require('./articles');
const topicRouter = require('./topics');
const userRouter = require('./users');
const commentRouter = require('./comments');
const getAll = require('../controllers/index')

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.get('/', getAll)

module.exports = apiRouter;