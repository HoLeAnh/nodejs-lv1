const mysql = require('./mysql')


let run = async () => {
    // let accounts = await mysql.queryDB('SELECT * FROM account')

    await mysql.connectDB()

    // let acc = await mysql.connection.query('SELECT * from account', function (error, result) {
    //     //if (error) throw error;
    //     console.log('The solution is: ' + JSON.stringify(result))
    //     return result
    // });
   

    let acc = await mysql.queryDB('SELECT * from account')
    //console.log('The solution is: ' + await acc);
    await mysql.connection.end()

}

run()