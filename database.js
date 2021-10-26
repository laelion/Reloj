
const express = require("express");
const app = express();
const sql = require('mssql')

const sqlConfig = {
  user: "lion",
  password: "123",
  database: "ejemplo",
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, 
    trustServerCertificate: true 
  }
}

const conexion = new sql.ConnectionPool(sqlConfig);
const request = new sql.Request(conexion);


module.exports = {sql, sqlConfig, conexion, request};