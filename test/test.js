var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var server = require("../app.js");

lab.experiment("Basic HTTP Tests", function() {
  // tests
  lab.before((done) => {
    server.initialize((err) => {
      require('../fixtures/fixtures.js')(server,done);
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
