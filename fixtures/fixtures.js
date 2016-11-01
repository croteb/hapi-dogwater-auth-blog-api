module.exports = function(server,done){
  done = done || function(){};
  const Users = server.collections().users;
  // Create a user john:secret
  Users.create([
      { username: 'john', password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm' }
  ]).then(() => {
    console.log(`Go find some data at ${server.info.uri}`);
    done();
  }).catch((err) => {
    console.error(err);
    done(err);
  });
}
