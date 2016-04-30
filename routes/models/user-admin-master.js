'use strict';
var pgOrm = require('./../../utils/pg-orm-lib');
var userAdminEntity = {
    name: 'user_admin_master',
    fields:
        [
            'user_id','firstname','lastname',
            'password', 'address','user_title',
            'address','privilege','phone_no',
            'del_status','contact_no'
        ],
    attributes: {
        user_id: {
            type: 'character varying'
        },
        password: {
            type: 'character varying'
        },
        first_name: {
            type: 'character varying'
        },
        last_name: {
            type: 'character varying'
        },
        address: {
            type: 'character varying'
        },
        user_title: {
            type: 'character varying'
        },
        phone_no: {
            type: 'character varying'
        },
        privilege:{
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
var userAdmin = pgOrm.define(userAdminEntity);
module.exports = userAdmin;
