'use strict';
var pgOrm = require('./../../utils/pg-orm-lib');
var bikeEntity = {
    name: 'bikes', // will match table with name 'users'
    fields:
        [
            'bike_id','mac_address',
            'signed_msg', 'public_key','bike_status',
            'current_user_id','previous_user_id','current_latlngs',
            'current_zone_id','current_geofence_id','del_status','date_time',
            'del_status'
        ],
    attributes: {
        bike_id: {
            type: 'character varying',
            unique: true
        },
        mac_address: {
            type: 'character varying'
        },
        signed_msg: {
            type: 'character varying'
        },
        public_key: {
            type: 'character varying'
        },
        bike_status: {
            type: 'character varying'
        },
        current_user_id: {
            type: 'character varying'
        },
        previous_user_id: {
            type: 'character varying'
        },
        current_latlngs: {
            type: 'character array'
        },
        current_zone_id: {
            type: 'character varying'
        },
        current_geofence_id: {
            type: 'character varying'
        },
        date_time: {
            type: 'timestamp with time zone'
        },
        del_status:{
            type: 'character varying'
        }
    }
}
var bikes = pgOrm.define(bikeEntity);
module.exports = bikes;
