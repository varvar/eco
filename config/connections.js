module.exports.connections = {
  // sails-disk is installed by default.
  localDiskDb: {
    adapter: 'sails-disk'
  },
  mysqlcon: {
    adapter: 'sails-mysql',
  	host: 'bz6vytitzbg4lhpjc30i-mysql.services.clever-cloud.com',
  	user: 'urhzljo4dhkz3kmt', //optional
  	port: 3306,
  	password: 'Mi6KOLSWojLlOezLidhH', //optional
  	database: 'bz6vytitzbg4lhpjc30i' //optional
  }
};