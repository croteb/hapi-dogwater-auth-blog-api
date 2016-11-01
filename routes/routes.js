module.exports = [
{
  method: 'get',
  path: '/posts/{id}',
  handler: function (request, reply) {
    const Posts = request.collections().posts;
    Posts.findOne(request.params.id).populate('comments').exec(function(err,post){
      if(err){
        reply(err).code(500);
      } else {
        reply(post);
      }
    });
  }
},
{
  method: 'post',
  path: '/posts',
  config: { auth: 'simple' },
  handler: function(request,reply){
    const Posts = request.collections().posts;
    const data = request.payload.content || "";
    Posts.create({content: data, owner: request.auth.credentials.id}).exec(function(err,data){
      if(err){
        reply(err).code(500);
      } else {
        reply(data);
      }
    })
  }
},
{
  method: 'post',
  path: '/posts/{id}/comments',
  handler: function(request,reply){
    const Posts = request.collections().posts;
    Posts.find(request.params.id).exec(function(err,post){
      if(err){
        reply(err).code(500);
      } else {
        const Comments = request.collections().comments;
        Comments.create({content: request.payload.content,parent: request.params.id}).exec(function(err,comment){
          if(err){
            reply(err).code(500);
          } else {
            reply(comment);
          }
        });
      }
    })
  }
},
{
  method: 'get',
  path: '/posts',
  handler: function(request,reply) {
    const Posts = request.collections().posts;
    Posts.find().populate("comments").exec(function(err,posts){
      reply(posts);
    })
  }
}]

