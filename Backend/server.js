const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const mysql = require("mysql2");
require("dotenv").config();



app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err) => {
    if (err) {
        console.err("Error to connect in Database, err")
    } else {
        console.log("MySQL database connected :)")
    }
  })




app.listen(port, () => {
    console.log(`app listening at port ${port}`);
});