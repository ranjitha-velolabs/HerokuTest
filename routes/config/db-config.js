'use strict';
var config = require('./config');
var pgOrm = require('./../../utils/pg-orm-lib');
pgOrm.setup(config.db);
process.on('SIGINT', function() {
    pgOrm.end();
    console.log('DB disconnected on app termination');
    process.exit(0);
});
