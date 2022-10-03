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
	database:DB_Info.account
});

const template = require('/app/lib/template')

DB.connect();

app.get('/update/:tid/edit',(req,res) => {
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

app.patch('/update/update_process',(req, res) => {
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

app.delete('/update/delete_process',(req, res) => {
  const id = req.body.tid;
	DB.query('DELETE FROM topic WHERE id = ?;', [id],(err, result) => {
    if (err) throw err;
    res.redirect(302,'/');
  });
})

app.listen(port);