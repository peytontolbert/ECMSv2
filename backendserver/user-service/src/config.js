var config = {
    development: {
        //mongodb connection settings
        mysql: {
            host: "127.0.0.1",
            user: "root",
            password: "password",
            database: "demo",
        },
        //server details
        server: {
            host: '127.0.0.1',
            port: '555'
        }
    },
    production: {
        //mongodb connection settings
        mysql: {
            host: "127.0.0.1",
            user: "root",
            password: "password",
            database: "demo",
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '555'
        }
    }
    };
    module.exports = config;