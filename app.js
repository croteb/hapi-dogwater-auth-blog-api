const Hapi = require('hapi');
const Dogwater = require('dogwater');
const HapiBasicAuth = require('hapi-auth-basic');
const Memory = require('sails-memory');
const modelsFile = require('./models/models.js');
const Bcrypt = require('bcrypt');
const server = new Hapi.Server();

server.connection({ port: 3000 });

const validate = function (request, username, password, callback) {
  // find user by username
  request.collections().users.findOneByUsername(username,function(err,user){
    if (!user || err) {
      return callback(null, false);
    }
    // compare passwords
    Bcrypt.compare(password, user.password, (err, isValid) => {
      callback(err, isValid, { id: user.id, name: user.username });
    });
  });
};

const routes = require('./routes/routes.js');

// register dogwater and http basic auth plugins
server.register([{
  register: Dogwater,
  options: {
    adapters: {
      memory: Memory
    },
    connections: {
      simple: { adapter: 'memory' }
    },
    models: modelsFile
  }
}, {
  register: HapiBasicAuth,
  options: {}
}], (err) => {
  if (err) {
    throw err;
  }
  // make auth available
  server.auth.strategy('simple', 'basic', { validateFunc: validate });
  server.route(routes);
  // if executing directly then start server
  if (!module.parent) {
    server.start((err) => {
      if (err) {
        throw err;
      }
      // Add some records
      require('./fixtures/fixtures.js')(server,function(){
        console.log("Done bootstrapping memory");
      })
    });
  }
});

module.exports = server;
