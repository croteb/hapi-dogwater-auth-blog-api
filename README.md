# Hapi, Dogwater, Http-Basic-Auth Blog API Example
This is a simple combining of various technologies to show how they might interact with each other. Also looking at ES6.

# Reasoning
* HAPI - Having written several RESTful APIs in Node.js over the years I've always liked the pluggability of hapi for expansion as needed (jwt,oauth,logging,etc) and know its used in production (walmart, etc).
* Dogwater - I like the waterline ORM because it allows you a lot of flexibility for swapping in/out various SQL and NoSQL options. This sample does everything in memory for convenience.
* Http-Basic-Auth - This plugin allows a simple auth strategy via standard HTTP auth for consumption.  Because of the plugin nature of hapi you are not strictly locked to that one method which means its easy to expand to a user/cookie/webpage without major refactoring.

# Getting started
```
git clone git@github.com:croteb/hapi-dogwater-auth-blog-api.git
cd hapi-dogwater-auth-blog-api
npm install .
npm test # runs test suite
npm start # starts server
./test.sh # run the curl tests

```

# API endpoints
```
curl http://localhost:3000/posts # get all posts and comments
curl http://localhost:3000/posts -H "Content-Type: application/json" -u "john:secret" -d '{"content": "this is a thread"}' # post a new post
curl http://localhost:3000/posts/1/comments -H "Content-Type: application/json" -d '{"content":"first comment!!!!"}' # comment on a post
curl http://localhost:3000/posts/1/comments -H "Content-Type: application/json" -d '{"content":"first comment!!!!","name":"bunga"}' # comment on a post with optional name
curl http://localhost:3000/posts/1 # get a specific post and its comments
```

# Tested with
* Ubuntu 16.04.1 LTS
* node v6.9.1
* npm 3.10.8

# Assumptions / futures
* User management is static via fixtures right now. Allow users to register on demand.
* Move from memory storage to disk/sql/nosql.
* Move to more external config based configuration.

# Directories
* fixtures - data to load into app on startup / test
* models - data models the app uses
* routes - api routes to associate with app
* test - test suite using lab and code (like hapi)
