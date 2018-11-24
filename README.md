# NC News

An api that serves up articles, users, topics and and comments for a news site

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to install the prerequisites for running and testing the application by running the following on the command line.

```
$ npm install
```

You will also need to set up the following config file:

```
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'
const dbURL= {
    dev : 'mongodb://localhost:27017/northcoders_news',
    test : 'mongodb://localhost:27017/northcoders_news_test',
}
module.exports = dbURL[ENV]
```

To do this create a file called config.js in the main directory and copy in the above code

### Using the API

The following end points are served up by the api. Type the following urls into either a browser or postman to access the data.
All relevant linked data will also be attached, for example when an article belongs to a topic the topic will also be included in the response.

```http
GET /api
# Serves an HTML page with documentation for all the available endpoints
```

```http
GET /api/topics
# Gets all the topics
```

```http
GET /api/topics/:topic_slug/articles
# Returns all the articles for a certain topic
# e.g: `/api/topics/football/articles`
```

```http
POST /api/topics/:topic_slug/articles
# Adds a new article to a topic. This route requires a JSON body with title and body key value pairs
# e.g: `{ "title": "new article", "body": "This is my new article content", "created_by": "user_id goes here"}`
```

```http
GET /api/articles
# Returns all the articles
```

```http
GET /api/articles/:article_id
# Gets an individual article
```

```http
GET /api/articles/:article_id/comments
# Gets all the comments for a individual article
```

```http
POST /api/articles/:article_id/comments
# Adds a new comment to an article. This route requires a JSON body with body and created_by key value pairs
# e.g: `{"body": "This is my new comment", "created_by": "user_id goes here"}`
```

```http
PATCH /api/articles/:article_id
# Increments or Decrements the votes of an article by one. This route requires a vote query of 'up' or 'down'
# e.g: `/api/articles/:article_id?vote=up`
```

```http
DELETE /api/comments/:comment_id
# Deletes a comment
```

```http
GET /api/users/:username
# e.g: `/api/users/mitch123`
# Returns a JSON object with the profile data for the specified user.
```

All get requests that serve up articles also supply a comment count

## Running the tests

To run the tests type

```
npm test
```

into the command line.

### Test break down

```
GET
```

These tests test that the controllers serve up the relevant end points. Tests are also provided to check that errors are being handled appropriately. Tests are supplied to test handling of 400 'bad requests' and 404 'item not found'.

```
POST PATCH DELETE
```

Tests are provided to check that the responses are being served up correctly after the relevent action has completed
Tests are also provided to check that the comment counts are working correctly.

## Hosting

This API is hosted on Heroku on the following link, while the database is hosted on MLab

```
https://young-savannah-18120.herokuapp.com
```
