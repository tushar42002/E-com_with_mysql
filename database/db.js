import mysql from 'mysql';

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "e-com"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  export default con;