module.exports = [
{
  // users have posts
  identity: 'users',
  connection: 'simple',
  attributes: {
    username: 'string',
    password: 'string',
    posts: {
      collection: 'posts',
      via: 'owner'
    }
  }
},
{
  // posts belong to a user
  identity: 'posts',
  connection: 'simple',
  attributes: {
    content: 'string',
    owner: {
      model: 'users'
    },
    comments: {
      collection: 'comments',
      via: 'parent'
    }
  }
},
{
  // comments belong to a post (but can be anonymous as implemented)
  identity: 'comments',
  connection: 'simple',
  attributes: {
    content: 'string',
    name: 'string',
    parent: {
      model: 'posts'
    }
  }
}
];
