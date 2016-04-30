'use strict';

var pgOrm = require('./../../utils/pg-orm-lib');
require('./bikes');
require('./user-master');
var rideEntity = {
    name: 'ride_master', // will match table with name 'users'
    fields:
        [
            'bike_id','user_id',
            'ride_id', 'starting_zone','start_place',
            'end_place','miles','end_date',
            'recovered_status','start_date','del_status'
        ],
    attributes: {
        bike_id: {
            type: 'character varying'
        },
        user_id: {
            type: 'character varying'
        },
        ride_id: {
            type: 'character varying'
        },
        starting_zone: {
            type: 'character array'
        },
        start_place: {
            type: 'character varying'
        },
        end_place: {
            type: 'character varying'
        },
        miles: {
            type: 'character varying'
        },
        end_date: {
            type: 'timestamp with time zone'
        },
        recovered_status: {
            type: 'character varying'
        },
        start_date: {
            type: 'timestamp with time zone'
        },
        del_status:{
            type: 'character varying'
        }
    }
}
var rides = pgOrm.define(rideEntity);
module.exports = rides;
