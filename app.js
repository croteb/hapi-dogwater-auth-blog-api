const Hapi = require('hapi');
const Dogwater = require('dogwater');
const Memory = require('sails-memory');
const modelsFile = require('./models/models.js');
const server = new Hapi.Server();
server.connection({ port: 3000 });
const routes = require('./routes/routes.js');
server.route(routes);

server.register({
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
}, (err) => {
  if (err) {
    throw err;
  }
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
