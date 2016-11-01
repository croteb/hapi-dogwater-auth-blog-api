var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require("../app.js");

lab.experiment("HTTP REST API Tests", function() {
  // tests
  lab.before((done) => {
    server.initialize((err) => {
      require('../fixtures/fixtures.js')(server,done);
    });
  });
  lab.test("get empty posts",function(done){
    var options = {
      method: "GET",
      url: "/posts"
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result.length).to.equal(0);
      done();
    });
  });
  lab.test("invalid user post",function(done){
    var options = {
      method: "POST",
      url: "/posts"
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(401);
      done();
    });
  });
  lab.test("invalid user post no content",function(done){
    var username = "john";
    var password = "secret";
    var options = {
      method: "POST",
      url: "/posts",
      headers: {
        authorization: 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64')
      }
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(400);
      done();
    });
  });
  lab.test("bad user post on password",function(done){
    var username = "john";
    var password = "secret1";
    var options = {
      method: "POST",
      url: "/posts",
      headers: {
        authorization: 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64')
      },
      payload: '{"content":"first post"}'
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(401);
      done();
    });
  });
  lab.test("bad user post on username",function(done){
    var username = "john1";
    var password = "secret";
    var options = {
      method: "POST",
      url: "/posts",
      headers: {
        authorization: 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64')
      },
      payload: '{"content":"first post"}'
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(401);
      done();
    });
  });

  lab.test("valid user post 1",function(done){
    var username = "john";
    var password = "secret";
    var options = {
      method: "POST",
      url: "/posts",
      headers: {
        authorization: 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64')
      },
      payload: '{"content":"first post"}'
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result.id).to.equal(1);
      Code.expect(response.result.content).to.equal("first post");
      done();
    });
  });
  lab.test("valid user post 2",function(done){
    var username = "john";
    var password = "secret";
    var options = {
      method: "POST",
      url: "/posts",
      headers: {
        authorization: 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64')
      },
      payload: '{"content":"second post"}'
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result.id).to.equal(2);
      Code.expect(response.result.content).to.equal("second post");
      done();
    });
  });
  lab.test("anonymous comment 1 on post 1",function(done){
    var options = {
      method: "POST",
      url: "/posts/1/comments",
      payload: '{"content":"first comment"}'
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result.content).to.equal("first comment");
      Code.expect(response.result.parent).to.equal(1);
      done();
    });
  });
  lab.test("anonymous comment 2 on post 1",function(done){
    var options = {
      method: "POST",
      url: "/posts/1/comments",
      payload: '{"content":"second comment"}'
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result.content).to.equal("second comment");
      Code.expect(response.result.parent).to.equal(1);
      done();
    });
  });
  lab.test("check comments on post 1",function(done){
    var options = {
      method: "GET",
      url: "/posts/1"
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result.comments.length).to.equal(2);
      done();
    });
  });
  lab.test("check posts and comments",function(done){
    var options = {
      method: "GET",
      url: "/posts"
    };
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(response.result.length).to.equal(2);
      Code.expect(response.result[0].comments.length).to.equal(2);
      done();
    });
  });

  /*
  lab.test("Get dog 1", function(done) {
    var options = {
      method: "GET",
      url: "/dogs/1"
    };
    // server.inject lets you similate an http request
    server.inject(options, function(response) {
      Code.expect(response.statusCode).to.equal(200);  //  Expect http response status code to be 200 ("Ok")
      Code.expect(response.result.name).to.equal("Guinness"); // Expect result to be "Hello Timmy!" (12 chars long)
      done();                                         // done() callback is required to end the test.
    });
  });
  */
});
