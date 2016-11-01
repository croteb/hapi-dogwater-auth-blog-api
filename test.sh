#empty
curl http://localhost:3000/posts
#put one in
echo -e "\nfirst thread"
curl http://localhost:3000/posts -H "Content-Type: application/json" -u "john:secret" -d '{"content": "this is a thread"}'
echo -e "\nsecond thread"
curl http://localhost:3000/posts -H "Content-Type: application/json" -u "john:secret" -d '{"content": "this is a second thread"}'
echo -e "\nshould see posts so far"
curl http://localhost:3000/posts

echo -e "\ncommenting"
curl http://localhost:3000/posts/1/comments -H "Content-Type: application/json" -d '{"content":"first comment!!!!"}'
echo -e "\nsecond commenting"
curl http://localhost:3000/posts/1/comments -H "Content-Type: application/json" -d '{"content":"second comment!!!!"}'

echo -e "\ncheck first comment on first post"
curl http://localhost:3000/posts/1

echo -e "\ncheck all posts with comments"
curl http://localhost:3000/posts


