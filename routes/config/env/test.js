'use strict';

//MongoDB configuration for testing environment
module.exports = {
   db: process.env.DATABASE_URL || 'postgres://vnlbplwzgfvkxg:cDhh2llYeL1fLKMIqwa3h48wMf@ec2-54-204-41-70.compute-1.amazonaws.com:5432/d9rpl071a450n6'
};
// module.exports = {
//   db: 'mongodb://localhost/meanpassportauth_test',
//   redisHost: 'localhost',
//   redisPort:6379
// };
