var mysql = require('mysql');
const Promise = require('bluebird');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gorilla_fit'
});

Promise.promisifyAll(connection);

module.exports.selectAll = function (callback) {
  connection.query('SELECT * FROM user where ', function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.isNewUser = function (username, callback) {
  connection.query(`SELECT * FROM USER where USERNAME = '${username}'`, function (err, results, fields) {
    if (results.length === 0 ) {
      callback(null, results);
    } else {
      callback({err: 'this user already exists'}, null);
    }
  });
};

module.exports.isExistingUser = function (username, callback) {
  connection.query(`SELECT * FROM USER where USERNAME = '${username}'`, function (err, results, fields) {
    if (results.length === 0 ) {
      console.log('this user dont exist');
      callback({err: 'this user doesnt exist!'}, null);
    } else {
      console.log('this user DO exist');
      callback(null, results);
    }
  });
};

module.exports.findUserByID = function (id, callback) {
  connection.query(`SELECT * FROM USER where id = ${id}`, function (err, results, fields) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.getHealthHistory = function (username, callback) {
  const healthHistory = {};
  connection.query(`select id from user where username = '${username}';`, (err, results, fields)=>{
    id = results[0]['id'];
    connection.query(`select * from food where userid = '${id}';`, (err, results, fields)=>{
      healthHistory.food = results;
      connection.query(`select * from exercise where userid = '${id}';`, (err, results, fields)=>{
        healthHistory.exercise = results;
        callback(null, healthHistory);
      });
    });
  });
};

module.exports.insertUser = function (username, hash, callback) {
  connection.query(`insert into user (username, hash) values ('${username}', '${hash}');`, (err, results, fields)=>{
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.insertFood = function (username, food, callback) {
  connection.query(`select id from user where username = '${username}';`, (err, results, fields)=>{
    id = results[0]['id'];
  });
};





