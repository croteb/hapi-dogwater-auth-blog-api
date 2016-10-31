const Hapi = require('hapi');
const Dogwater = require('dogwater');
const Memory = require('sails-memory');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'get',
  path: '/dogs/{id}',
  handler: function (request, reply) {
    const Dogs = request.collections().dogs;
    reply(Dogs.findOne(request.params.id));
  }
});

server.route({
  method: 'get',
  path: '/post',
  handler: function(request,reply) {
    console.log("post");
    const Posts = request.collections().posts;
    reply(Posts);
  }
})

server.register({
  register: Dogwater,
  options: {
    adapters: {
      memory: Memory
    },
    connections: {
      simple: { adapter: 'memory' }
    }
  }
}, (err) => {
  if (err) {
    throw err;
  }
  // Define a model using a connection declared above
  server.dogwater({
    identity: 'dogs',
    connection: 'simple',
    attributes: { name: 'string' }
  });
  server.dogwater({
    identity: 'user',
    connection: 'simple',
    attributes: {
      username: 'string',
      posts: {
        collection: 'post',
        via: 'owner'
      }
    }
  });
  server.dogwater({
    identity: 'post',
    connection: 'simple',
    attributes: {
      content: 'string',
      owner: {
        model: 'user'
      },
      comments: {
        collection: 'comment',
        via: 'parent'
      }
    }
  });
  server.dogwater({
    identity: 'comment',
    connection: 'simple',
    attributes: {
      content: 'string',
      parent: {
        model: 'post'
      }
    }
  });
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
