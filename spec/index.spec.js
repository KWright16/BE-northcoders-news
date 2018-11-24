process.env.NODE_ENV = "test";
const app = require("../app");
const mongoose = require("mongoose");
const request = require("supertest")(app);
const { expect } = require("chai");
const seedDB = require("../seed/seed");
const testData = require("../seed/testData/index");

describe("/api", () => {
  let topicDocs,
    userDocs,
    articleDocs,
    commentDocs,
    wrongId = mongoose.Types.ObjectId();
  beforeEach(() => {
    return seedDB(testData).then(docs => {
      [topicDocs, userDocs, articleDocs, commentDocs] = docs;
    });
  });
  after(() => {
    console.log("done");
    return mongoose.disconnect();
  });
  describe("/topics", () => {
    it("GET returns status 200 an array of all the topics", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(({ body: { topics } }) => {
          expect(topics.length).to.equal(topicDocs.length);
          expect(topics[0].title).to.equal(topicDocs[0].title);
          expect(topics[1].slug).to.equal(topicDocs[1].slug);
        });
    });
  });
  it("GET returns status 200 an array of all the articles for a topic", () => {
    return request
      .get(`/api/topics/${articleDocs[0].belongs_to}/articles`)
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles[0].title).to.equal(articleDocs[0].title);
        expect(articles[0].body).to.equal(articleDocs[0].body);
        expect(articles[0].comment_count).to.equal(2);
      });
  });
  it("GET returns status 404 if given a bad request", () => {
    return request
      .get("/api/topics/pigeons/articles")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("Articles not found for topic: pigeons");
      });
  });
  it("POST returns status 201 and the posted article", () => {
    const newArticle = {
      title: "new article",
      body: "This is my new article content",
      created_by: userDocs[0]._id
    };
    return request
      .post(`/api/topics/${articleDocs[0].belongs_to}/articles`)
      .send(newArticle)
      .expect(201)
      .then(({ body: { article } }) => {
        expect(article.title).to.equal(newArticle.title);
        expect(article.belongs_to).to.equal(articleDocs[0].belongs_to);
      });
  });
  describe("/articles", () => {
    it("GET returns status 200 an array of all the articles", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles.length).to.equal(articleDocs.length);
          expect(articles[0].title).to.equal(articleDocs[0].title);
          expect(articles[1].body).to.equal(articleDocs[1].body);
          expect(articles[0].comment_count).to.equal(2);
        });
    });
  });
  it("GET returns status 200 and the article requested", () => {
    return request
      .get(`/api/articles/${articleDocs[0].id}`)
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article.title).to.equal(articleDocs[0].title);
        expect(article.body).to.equal(articleDocs[0].body);
        expect(article.comment_count).to.equal(2);
      });
  });
  it("GET returns status 400 if given a bad request", () => {
    return request
      .get("/api/articles/1234")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("Bad Request");
      });
  });
  it("GET returns status 404 if article not found", () => {
    return request
      .get(`/api/articles/${wrongId}`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal(`Article not found for ID: ${wrongId}`);
      });
  });
  it("PUT - returns status 202 and updated article object", () => {
    return request
      .put(`/api/articles/${articleDocs[0].id}?vote=up`)
      .expect(202)
      .then(({ body: { article } }) => {
        expect(article.votes).to.equal(articleDocs[0].votes + 1);
      });
  });
  it("PUT returns status 404 if article not found", () => {
    return request
      .put(`/api/articles/${wrongId}/?vote=up`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal(`Article not found for ID: ${wrongId}`);
      });
  });
  it("PUT returns status 400 if given a bad request", () => {
    return request
      .put("/api/articles/1234/?vote=up")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("Bad Request");
      });
  });
  it("GET returns status 200 an array of all the comments for an article", () => {
    return request
      .get(`/api/articles/${commentDocs[0].belongs_to}/comments`)
      .expect(200)
      .then(({ body: { comments } }) => {
        expect(comments[0].votes).to.equal(commentDocs[0].votes);
        expect(comments[0].body).to.equal(commentDocs[0].body);
      });
  });
  it("GET returns status 400 if given a bad request", () => {
    return request
      .get("/api/articles/1234/comments")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal("Bad Request");
      });
  });
  it("GET returns status 404 if article not found", () => {
    return request
      .get(`/api/articles/${wrongId}/comments`)
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal(`Comments not found for ID: ${wrongId}`);
      });
  });
  it("POST returns status 201 and the posted comment", () => {
    const newComment = {
      body: "This is my new comment",
      created_by: userDocs[0]._id
    };
    return request
      .post(`/api/articles/${commentDocs[0].belongs_to}/comments`)
      .send(newComment)
      .expect(201)
      .then(({ body: { comment } }) => {
        expect(comment.body).to.equal(newComment.body);
      });
  });
  describe("/comments/:comment_id", () => {
    it("DELETE it returns a status 200 and returns the deleted item", () => {
      return request
        .delete(`/api/comments/${commentDocs[0].id}`)
        .expect(200)
        .then(({ body: { comment } }) => {
          expect(comment.votes).to.equal(commentDocs[0].votes);
          expect(comment.body).to.equal(commentDocs[0].body);
        });
    });
    it("PUT - returns status 202 and updated comment object", () => {
      return request
        .put(`/api/comments/${commentDocs[0].id}?vote=up`)
        .expect(202)
        .then(({ body: { comment } }) => {
          expect(comment.votes).to.equal(commentDocs[0].votes + 1);
        });
    });
    it("PUT returns status 404 if comment not found", () => {
      return request
        .put(`/api/comments/${wrongId}/?vote=up`)
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal(`Comment not found for ID: ${wrongId}`);
        });
    });
    it("PUT returns status 400 if given a bad request", () => {
      return request
        .put("/api/comments/1234/?vote=up")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal("Bad Request");
        });
    });
  });
  describe("/users/:username", () => {
    it("GET returns status 200 and the user requested", () => {
      return request
        .get(`/api/users/${userDocs[0].username}`)
        .expect(200)
        .then(({ body: { user } }) => {
          expect(user.name).to.equal(userDocs[0].name);
          expect(user.username).to.equal(userDocs[0].username);
        });
    });
  });
  it("GET returns status 400 if given a bad request", () => {
    return request
      .get("/api/users/joebloggs")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).to.equal(`User joebloggs not found.`);
      });
  });
});
