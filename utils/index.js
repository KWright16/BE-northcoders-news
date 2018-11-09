const generateRefObj = (data, docs) => {
    return data.reduce((refObj, datum, index) => {    
      refObj[datum.username] = docs[index]._id
      return refObj;
    }, {})
  }
  // articles mongo id = 
  const generateCommentRefObj = (data, docs) => {
    return data.reduce((refObj, datum, index) => {    
      refObj[datum.title] = docs[index]._id
      return refObj;
    }, {})
  }


const formatArticleData = (articleData, userRefObj) => {
    return articleData.map(articleDatum => {
        return {
            ...articleDatum,
            created_by : userRefObj[articleDatum.created_by],
            belongs_to : articleDatum.topic       
        }
    })
}
const formatCommentData = (commentData, userRefObj, articleRefObj) => {
    return commentData.map(commentDatum => {
        return {
            ...commentDatum,
            created_by : userRefObj[commentDatum.created_by],
            belongs_to : articleRefObj[commentDatum.belongs_to]
        }
    })
}

module.exports = { generateRefObj, generateCommentRefObj, formatArticleData, formatCommentData }