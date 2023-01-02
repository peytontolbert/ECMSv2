const mysql = require("mysql");
const { config } = require('../config');
const { Connection, Request } = require('tedious');


module.exports = async() => {

    try {  
        const config = {
            userName: 'your_username',
            password: 'your_password',
            server: 'your_server.database.windows.net',
            options: {
              database: 'your_database',
              encrypt: true
            }
          };

            
                
        var systemhistory = "CREATE TABLE IF NOT EXISTS systemhistory (valve varchar(255) NOT NULL PRIMARY KEY, status varchar(255) NOT NULL, username varchar(255) NOT NULL)";
        con.query(systemhistory, function (err, result) {
            if (err) throw err;
            console.log("systemhistory table connected");
        })

        var systems = "CREATE TABLE IF NOT EXISTS systems (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL)";
        con.query(systems, function (err, result) {
            if (err) throw err;
            console.log("systems table connected");
        })

        var wafs = "CREATE TABLE IF NOT EXISTS wafs (id int NOT NULL PRIMARY KEY, waf varchar(255) NOT NULL, valve varchar(255) NOT NULL)";
        con.query(wafs, function (err, result) {
            if (err) throw err;
            console.log("wafs table connected");
        })


        var valves = "CREATE TABLE IF NOT EXISTS valves (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL, valve varchar(255) NOT NULL, coords varchar(255))";
        con.query(valves, function (err, result) {
            if (err) throw err;
            console.log("valves table connected");
        })

        var pipes = "CREATE TABLE IF NOT EXISTS pipes (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL, name varchar(255) NOT NULL, edges varchar(255) NOT NULL, status varchar(255), coords varchar(255), shape varchar(255) NOT NULL)";
        con.query(pipes, function (err, result) {
            if (err) throw err;
            console.log("pipes table connected");
        })

        var components = "CREATE TABLE IF NOT EXISTS components (id int NOT NULL PRIMARY KEY, system varchar(255) NOT NULL, name varchar(255) NOT NULL, edges varchar(255), status varchar(255), coords varchar(255), shape varchar(255) NOT NULL)";
        con.query(components, function (err, result) {
            if (err) throw err;
            console.log("components table connected");
        })

        console.log('Db Connected');
        
    } catch (error) {
        console.error('Error ============ ON DB Connection')
        console.log(error);
    }
 
};