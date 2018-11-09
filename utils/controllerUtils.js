const { Comment } = require('../models/index')

const getCommentCount = (article) => {  
    return Comment.find({ belongs_to: article._id })    
    .then((comments) => {        
        const comment_count = comments.length
        article = {
            ...article,
            comment_count: comment_count
        };
        return article;
    })
}

module.exports = { getCommentCount }