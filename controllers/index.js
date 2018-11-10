const { Topic, Article, Comment, User } = require('../models/index')

const getAll = (req, res, next) => {      
    return Promise.all([Topic.find(), Article.find(), Comment.find(), User.find()])
    .then(([topics, articles, comments, users]) => {        
        console.log([topics, articles, comments, users])
        res.render('index', [topics, articles, comments, users]) // need to  add in articles etc when working           
    })
    .catch(next);    
};

module.exports = getAll