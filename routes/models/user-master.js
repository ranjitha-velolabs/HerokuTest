'use strict';
var pgOrm = require('./../../utils/pg-orm-lib');
var userMasterEntity = {
    name: 'user_master',
    fields:
        [
            'user_id','user_name',
            'password', 'gender','name',
            'address','user_type','phone_no',
            'email','del_status','contact_no'
        ],
    attributes: {
        user_id: {
            type: 'character varying'
        },
        user_name: {
            type: 'character varying'
        },
        password: {
            type: 'character varying'
        },
        gender: {
            type: 'character varying'
        },
        name: {
            type: 'character array'
        },
        address: {
            type: 'character varying'
        },
        user_type: {
            type: 'character varying'
        },
        phone_no: {
            type: 'character varying'
        },
        email:{
            type: 'character varying'
        },
        del_status: {
            type: 'character varying'
        },
        contact_no:{
            type: 'character varying'
        }
    }
}
var userMaster = pgOrm.define(userMasterEntity);
module.exports = userMaster;

