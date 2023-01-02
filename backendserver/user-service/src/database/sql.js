const { Connection, Request } = require('tedious');

const config = {
  userName: 'your_username',
  password: 'your_password',
  server: 'your_server.database.windows.net',
  options: {
    database: 'your_database',
    encrypt: true
  }
};

const connection = new Connection(config);

connection.on('connect', function(err) {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to Azure SQL database!');
    const request = new Request(
      `SELECT * FROM your_table`,
      function(err, rowCount, rows) {
        console.log(rowCount + ' row(s) returned');
        process.exit();
      }
    );

    request.on('row', function(columns) {
      columns.forEach(function(column) {
        console.log(column.value);
      });
    });

    connection.execSql(request);
  }
}); 211 4WG3AS