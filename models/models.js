module.exports = [
{
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
  identity: 'comments',
  connection: 'simple',
  attributes: {
    content: 'string',
    parent: {
      model: 'posts'
    }
  }
}
];
