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

r.get('/:tid', (req, res) => {
  const sessionID = req.session.userId;
  const idData = req.params;
  const topicId = template.beNumOrDef(idData.tid,false);
  if(!topicId){
    res.redirect(302,'/topic/wrongpath')
  }

  DB.query(`SELECT topic.id, title, context, created, name, topic.author_id
  FROM ex_database.topic LEFT JOIN account.user 
  ON ex_database.topic.author_id = account.user.id
  WHERE topic.id = ?;`, [topicId], (err, topic) => {
    if(err) throw err;
    DB.query(`SELECT comment.id,comment.topic_id,context, created, name ,comment.author_id
    FROM ex_database.comment LEFT JOIN account.user 
    ON ex_database.comment.author_id = account.user.id 
    WHERE comment.topic_id = ? ORDER BY comment.created;`,[topicId], (err2, comments) => {
      if(err2) throw err2;
      let controlEnable = false;
      if(topic[0].author_id === sessionID) controlEnable = true;
      const html = template.html(topic[0].title,
        template.isLogined(req, res),
        '<span id ="back">BACK</span>'+
        template.topic.contorl(controlEnable),
        template.topic.context(topic[0]),
        template.topic.commentCreate(topic[0])+
        template.topic.comment(comments,sessionID)+
        `<script src="../javascript/cmtApp.js"></script>
        <script src="../../javascript/editApp.js"></script>`);
  
      res.send(html);
    });
  });
});

r.patch('/:tid',(req, res) => {
  const tid = req.params.tid;
  const title = req.body.title;
  const context = req.body.context;

  DB.query(`UPDATE topic SET title = ?, context = ?
  WHERE id = ?;`, [title, context, tid], (err, result) => {
    if(err) throw err;
    res.status(201).send()
  });
})

r.delete('/:tid',(req, res) => {
  const tid = Number(req.params.tid);

  DB.query(`DELETE FROM topic WHERE id = ?;`, [tid], (err, result) =>{
    if(err) throw err;
    res.status(204).send()
    DB.query(`DELETE FROM comment WHERE topic_id = ?;`, [tid], (err2, result) => {
      if(err2) throw err2;
    })
  })
})

r.post('/:tid/comment', (req, res) => {
  const userId = req.session.userId;
  const context = req.body.context;
  
  DB.query(`INSERT INTO comment (topic_id, context, created, author_id) VALUES (?, ?, NOW(), ?);`,
  [req.params.tid, context, userId],(err, result) => {
    if(err) throw err;
    res.json({
      id:result.insertId,
      name:req.session.name,
      context:context
    })
  })
})

r.patch('/:tid/comment/:cid',(req, res) => {
  DB.query('SELECT * FROM comment WHERE id = ?;' ,[req.params.cid], (err1, result) => {
    if(err1) throw err1;
    console.log(result[0].author_id)
    if(req.session.userId !== result[0].author_id){
      res.status(401).send()
      return false;
    }
    DB.query('UPDATE comment SET context = ? WHERE id =?;', [req.body.context, req.params.cid], (err, result) => {
      if(err) throw err;
      res.status(201).send()
    })
  })
})

r.delete('/:tid/comment/:cid', (req, res) => {
  DB.query('SELECT * FROM comment WHERE id = ?;' ,[req.params.cid], (err1, result) => {
    if(err1) {
      res.status(401).send()
      throw err1;
    }
    if(req.session.userId !== result[0].author_id){
      res.status(401).send()
      return false;
    }
    DB.query('DELETE FROM comment WHERE id = ?;',[req.params.cid],(err, result)=>{
      if(err) throw err;
      res.status(201).send();
    });
  })
})

r.get('/wrongpath',(req, res) => {
  const html = template.html('Wrong Path', '','','','');
  res.send(html)
});

module.exports = r;