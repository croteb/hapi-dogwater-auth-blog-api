const Joi = require('joi');
module.exports = [
{
  // get a specific post and its comments
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
  // create a new post, authenticate it and validate the payload
  method: 'post',
  path: '/posts',
  config: {
    auth: 'simple',
    validate: {
      payload: {
        content: Joi.string()
      }
    }
  },
  handler: function(request,reply){
    const Posts = request.collections().posts;
    Posts.create({content: request.payload.content, owner: request.auth.credentials.id}).exec(function(err,data){
      if(err){
        reply(err).code(500);
      } else {
        reply(data);
      }
    })
  }
},
{
  // add a comment to an existing post
  method: 'post',
  path: '/posts/{id}/comments',
  config: {
    validate: {
      payload: {
        content: Joi.string(),
        name: Joi.string().optional()
      }
    }
  },
  handler: function(request,reply){
    const Posts = request.collections().posts;
    Posts.findOne(request.params.id).exec(function(err,post){
      if(err){
        reply(err).code(500);
      } else if(!post){
        reply("Post not found").code(422);
      } else {
        const Comments = request.collections().comments;
        const name = request.payload.name || "anonymous";
        Comments.create({content: request.payload.content, parent: request.params.id, name: name}).exec(function(err,comment){
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
  // get all posts and all comments
  method: 'get',
  path: '/posts',
  handler: function(request,reply) {
    const Posts = request.collections().posts;
    Posts.find().populate("comments").exec(function(err,posts){
      reply(posts);
    })
  }
}]

