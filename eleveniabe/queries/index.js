const promise = require('bluebird');
const product = require('./product');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const cn = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'elevenia',
  user: 'postgres',
  password: 'postgres'
}
const db = pgp(cn);

// add query functions

module.exports = {
  productQuery: product(db)
}