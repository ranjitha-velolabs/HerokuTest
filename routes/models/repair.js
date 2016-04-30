'use strict';

var pgOrm = require('./../../utils/pg-orm-lib');
var repairEntity = {
        name: 'repair', // will match table with name 'users'
        fields:
            [
                    'bike_id','bike_status',
                    'current_location', 'last_customer_id','current_customer_id',
                    'problem','date_time','end_date',
                    'recovered_status','recovered_date','del_status'
            ],
        attributes: {
                bike_id: {
                        type: 'character varying',
                        unique: true
                },
                bike_status: {
                        type: 'character varying'
                },
                current_location: {
                        type: 'character array'
                },
                last_customer_id: {
                        type: 'character varying'
                },
                current_customer_id: {
                        type: 'character varying'
                },
                problem: {
                        type: 'character varying'
                },
                date_time: {
                        type: 'timestamp with time zone'
                },
                recovered_status: {
                        type: 'character varying'
                },
                recovered_date: {
                        type: 'timestamp with time zone'
                },
                del_status:{
                        type: 'character varying'
                }
        }
}
var repair = pgOrm.define(repairEntity);
module.exports = repair;
