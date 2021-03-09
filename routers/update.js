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

r.get('/:tid/edit',(req,res) => {
  const topicId = req.params.tid;
  DB.query(`SELECT * FROM topic WHERE id = ?;`, [topicId], (err, topic) => {
    if(err) throw err;
    if(topic[0].author_id !== req.session.userId) {
      res.redirect(`/topic/${topicId}`);
      return false;
    }
    const title = topic[0].title;
    const context = topic[0].context;
    const html = template.html(title,
      template.isLogined(req, res), '',
      `
      <div class = "topicUpWrap">
        <input type="hidden" name="tid" value="${topicId}" readonly>
        <p><input type="text" name="title" value="${title}"></p>
        <p>
          <textarea name="context">${context}</textarea>
        </p>
        <p>
          <input type="submit" value="Update">
        </p>
      </div>
      <div class="topicDelWrap">
        <input type="hidden" name="tid" value="${topicId}">
        <input type="submit" value="delete">
      </div>`,'<script src="../javascript/updateApp.js"></script>');
    res.send(html);
  });
})

r.patch('/update_process',(req, res) => {
  var post = req.body;
	var id = Number(post.tid);
	var title = post.title;
	var description = post.context;
  DB.query(`UPDATE topic SET title = ?, context = ?
  WHERE id = ?;`, [title, description, id], (err, result) => {
    if(err) throw err;
    res.redirect(`/topic/${id}`);
  }); 
})

r.delete('/delete_process',(req, res) => {
  const id = req.body.tid;
	DB.query('DELETE FROM topic WHERE id = ?;', [id],(err, result) => {
    if (err) throw err;
    res.redirect(302,'/');
  });
})

module.exports = r;