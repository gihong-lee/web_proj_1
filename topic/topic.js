const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const FileStore = require('session-file-store')(session)
const mysql = require('mysql');

const DB_Info = require('/app/lib/DB_Info')

const port = 8000;
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: DB_Info.password,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true},
  store: new FileStore()
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/app/javascript',express.static('javascript'));
const DB = mysql.createConnection({
	host:DB_Info.host,
	port:DB_Info.port,
	user:DB_Info.user,
	password:DB_Info.password,
	database:DB_Info.database
});

const template = require('/app/lib/template')

DB.connect();

app.get('/topic/:tid', (req, res) => {
  const sessionID = req.session.userId;
  const idData = req.params;
  const topicId = template.beNumOrDef(idData.tid,false);
  if(!topicId){
    res.redirect(302,'/topic/wrongpath')
  }

  DB.query(`SELECT topic.id, title, context, created, name, topic.author_id
  FROM ex_database.topic LEFT JOIN account.user 
  ON ex_database.topic.author_id = account.useapp.id
  WHERE topic.id = ?;`, [topicId], (err, topic) => {
    if(err) throw err;
    DB.query(`SELECT comment.id,comment.topic_id,context, created, name ,comment.author_id
    FROM ex_database.comment LEFT JOIN account.user 
    ON ex_database.comment.author_id = account.useapp.id 
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
        `<script src="/app/javascript/cmtApp.js"></script>
        <script src="/app/javascript/editApp.js"></script>`);
  
      res.send(html);
    });
  });
});

app.patch('/topic/:tid',(req, res) => {
  const tid = req.params.tid;
  const title = req.body.title;
  const context = req.body.context;

  DB.query(`UPDATE topic SET title = ?, context = ?
  WHERE id = ?;`, [title, context, tid], (err, result) => {
    if(err) throw err;
    res.status(201).send()
  });
})

app.delete('/topic/:tid',(req, res) => {
  const tid = Number(req.params.tid);

  DB.query(`DELETE FROM topic WHERE id = ?;`, [tid], (err, result) =>{
    if(err) throw err;
    res.status(204).send()
    DB.query(`DELETE FROM comment WHERE topic_id = ?;`, [tid], (err2, result) => {
      if(err2) throw err2;
    })
  })
})

app.post('/topic/:tid/comment', (req, res) => {
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

app.patch('/topic/:tid/comment/:cid',(req, res) => {
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

app.delete('/topic/:tid/comment/:cid', (req, res) => {
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

app.get('/topic/wrongpath',(req, res) => {
  const html = template.html('Wrong Path', '','','','');
  res.send(html)
});

app.listen(port);