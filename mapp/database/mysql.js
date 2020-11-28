const mysql = require('mysql');


var connection = mysql.createConnection({
  host: "35.230.45.187",
  port: '3306',
  user: "root",
  password: "constantstaging2019",
  database: "automation"
});

const connectDB = async () => {
  await connection.connect()
  console.log('connect DB success');
}

const queryDB = async (queryString) => {
  let results = await query(queryString).catch(console.log);
  results = JSON.parse(JSON.stringify(results))
  return results

}

const query = async (q, params) => new Promise(
  (resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    }
    connection.query(q, params, handler);
  });




connectDB()

module.exports = { connection, queryDB, connectDB }
