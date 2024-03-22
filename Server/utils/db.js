import mysql from "mysql";

const pool = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "", 
    database: "DurhamPolice",
});

pool.getConnection(function(err, connection) {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected to MySQL database");
        connection.release();
    }
});

export default pool;

