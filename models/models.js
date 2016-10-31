module.exports = [
{
  identity: 'dogs',
  connection: 'simple',
  attributes: { name: 'string' }
},
{
  identity: 'user',
  connection: 'simple',
  attributes: {
    username: 'string',
    posts: {
      collection: 'post',
      via: 'owner'
    }
  }
},
{
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
},
{
  identity: 'comment',
  connection: 'simple',
  attributes: {
    content: 'string',
    parent: {
      model: 'post'
    }
  }
}
];
