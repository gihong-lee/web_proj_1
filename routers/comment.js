const express = require('express');
const r = express.Router();
const template = require('../lib/template');
const mysql = require('mysql');
const DB_Info = require('../lib/DB_Info'); 
const DB = mysql.createConnection({
  host:DB_Info.host,
  user:DB_Info.user,
  password:DB_Info.password,
  database:DB_Info.database
});

DB.connect();