module.exports = {
    development: {
       dialect: 'postgres',
       host: '127.0.0.1',
       port: 5432,
       username: 'postgres',
       password: 'postgres',
       database: 'tz',
    },
    test: {
       dialect: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: 'postgres',
       database: 'tz',
    },
    production: {
       dialect: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: 'postgres',
       database: 'tz',
    },
 }