const mysql = require('mysql');
const DB_Info = require('./DB_Info'); 
const DB = mysql.createConnection({
    host:DB_Info.host,
    user:DB_Info.user,
    password:DB_Info.password,
    database:DB_Info.database
});

DB.connect();

const q = {
  topic:`CREATE TABLE topic (
    id Int(11) not null auto_increment,
    title varchar(100) not null,
    context varchar(100), 
    created DATETIME not null,
    author_id int(11) not null,
    primary Key(id)
  );`,

  comment:`CREATE TABLE comment (
    id Int(11) not null auto_increment,
    topic_id int(11) not null,
    context varchar(100), 
    created DATETIME not null,
    author_id int(11) not null,
    primary Key(id)
  );`,

  account:`CREATE TABLE user (
    id Int(11) not null auto_increment,
    user_id varchar(100) not null,
    password varchar(100) not null,
    name varchar(100) not null,
    primary Key(id)
  );`
}
/*
for(let i = 0; i < 7; i++){
  const user_id = `user#${i+1} ID`,
  password = `user#${i+1} PW`,
  name = `user#${i+1}`;
  DB.query('INSERT INTO user (user_id, password, name) VALUES (?, ?, ?)', [user_id,password,name], (err, result) => {
    if(err) throw err;
    console.log(i+1,'success');
  })
}
*/
for(let i = 0; i < 100; i++){
  const num = Math.round(Math.random() * 7.5 + 0.5);
  
  DB.query('INSERT INTO topic (title, context, created, author_id) VALUES (?, ?, NOW(), ?)', [`title #${i+1}`,`text #${i+1}`,num], (err, result) => {
    if(err) throw err;
    console.log(i+1,'success');
  })
}
