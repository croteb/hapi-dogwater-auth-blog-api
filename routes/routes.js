module.exports = [
{
  method: 'get',
  path: '/dogs/{id}',
  handler: function (request, reply) {
    const Dogs = request.collections().dogs;
    reply(Dogs.findOne(request.params.id));
  }
},
{
  method: 'get',
  path: '/post',
  config: { auth: 'simple' },
  handler: function(request,reply) {
    console.log("post");
    const Posts = request.collections().posts;
    reply(Posts);
  }
}]

