/**
 * Samples.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    datastore: 'mysqlcon',
    tableName: 'sample',
    attributes: {
        id: {
            type: 'number',
            autoIncrement: true
        },

        type: {
            type: 'string'
        },

        value: {
            type: 'number'
        },

        created: {
            type: 'string'
        }
    }
};

