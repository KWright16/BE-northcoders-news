const mongoose = require('mongoose');
const { Topic, User, Article, Comment } = require('../models/index');
const { generateRefObj, generateCommentRefObj, formatArticleData, formatCommentData } = require('../utils/index')

const seedDB = ({topicData, userData, articleData, commentData}) => {
    return mongoose.connection.dropDatabase()
    .then(() => {
        return Promise.all(
            [
                Topic.insertMany(topicData), 
                User.insertMany(userData)
            ])
    })
    .then(([topicDocs, userDocs]) => {
        const userRefObj = generateRefObj(userData, userDocs);        
        return Promise.all([
            topicDocs, 
            userDocs, 
            Article.insertMany(formatArticleData(articleData, userRefObj))
        ])       
    })
    .then(([topicDocs, userDocs, articleDocs]) => {
        const userRefObj = generateRefObj(userData, userDocs)
        const articleRefObj = generateCommentRefObj(articleData, articleDocs)
        return Promise.all([
            topicDocs,
            userDocs,
            articleDocs,
            Comment.insertMany(formatCommentData(commentData, userRefObj, articleRefObj))
        ])
    })
    .then(([topicDocs, userDocs, articleDocs, commentDocss]) => {
        console.log(userDocs[0])
    })
    .catch(console.log)   
}

module.exports = seedDB