const Hapi = require('hapi');
const Dogwater = require('dogwater');
const HapiBasicAuth = require('hapi-auth-basic');
const Memory = require('sails-memory');
const modelsFile = require('./models/models.js');
const server = new Hapi.Server();


server.connection({ port: 3000 });

const Bcrypt = require('bcrypt');
const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a'
  }
};
const validate = function (request, username, password, callback) {
  const user = users[username];
  if (!user) {
    return callback(null, false);
  }
  Bcrypt.compare(password, user.password, (err, isValid) => {
    callback(err, isValid, { id: user.id, name: user.name });
  });
};

const routes = require('./routes/routes.js');

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
  server.auth.strategy('simple', 'basic', { validateFunc: validate });
  server.route(routes);
  // Define a model using a connection declared above
  if (!module.parent) {
    server.start((err) => {
      if (err) {
        throw err;
      }
      // Add some records
      const Dogs = server.collections().dogs;
      Dogs.create([
          { name: 'Guinness' },
          { name: 'Sully' },
          { name: 'Ren' }
      ])
        .then(() => {
          console.log(`Go find some dogs at ${server.info.uri}`);
        })
      .catch((err) => {
        console.error(err);
      });
    });
  }
});

module.exports = server;
