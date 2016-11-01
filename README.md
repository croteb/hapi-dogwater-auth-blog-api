# Hapi, Dogwater, Http-Basic-Auth Blog API Example
This is a simple combining of various technologies to show how they might interact with each other.

# Reasoning
HAPI - Having written several RESTful APIs in Node.js over the years I liked the pluggability of hapi.
Dogwater - I like the waterline ORM because it allows you a lot of flexibility for swapping in/out various SQL and NoSQL options.
Http-Basic-Auth - This plugin allows a simple auth strategy via standard HTTP auth for consumption.  Because of the plugin nature of hapi you are not strictly locked to that one method which means its easy to expand to a user/cookie/webpage without major refactoring.

# Getting started
git clone git@github.com:croteb/hapi-dogwater-auth-blog-api.git
cd hapi-dogwater-auth-blog-api
npm install .
npm test # runs test suite
npm start # starts server
./test.sh
