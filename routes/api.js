const express = require("express");
const apiRouter = require("express").Router();
const articleRouter = require("./articles");
const topicRouter = require("./topics");
const userRouter = require("./users");
const commentRouter = require("./comments");

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articleRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/comments", commentRouter);

module.exports = apiRouter;
