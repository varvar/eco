/**
 * Samples.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
    datastore: 'mysqlcon',
    tableName: 'rule',
    attributes: {
        id: {
            type: 'number',
            autoIncrement: true
        },

        rule: {
            type: 'string'
        }
    }
};

