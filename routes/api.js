const apiRouter = require('express').Router();
const articleRouter = require('./articles');
const topicRouter = require('./topics')
const userRouter = require('./users')

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;