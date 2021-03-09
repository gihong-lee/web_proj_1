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

r.get('/',(req,res) => {
  if(!req.session.is_logined) {
    res.redirect(`/`);
    return false;
  }
  const html = template.html('Create',
  template.isLogined(req, res),'',`
  <form action="/create/create_process" method="post">
    <p><input type="text" name="title" placeholder="title"></p>
    <p>
      <textarea name="description" placeholder="description"></textarea>
    </p>
    <p>
      <input type="submit">
    </p>
    </form>`,'');
  res.send(html);

})

r.post('/create_process',(req, res) => {
  console.log(req.session);
  const post = req.body;
	const title = post.title;
  const description = post.description;
  const userId = req.session.userId;

  DB.query(`INSERT INTO topic (title, context, created, author_id) 
  VALUES (?, ?, NOW(), ?);`, [title, description, userId], (err,result) => {
    if(err) throw err;
    res.redirect(302,`/topic/${result.insertId}`);
  });
})


module.exports = r;