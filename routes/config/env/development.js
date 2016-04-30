'use strict';

//MongoDB configuration for development environment
module.exports = {
   db: process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/skyfleet'
};
