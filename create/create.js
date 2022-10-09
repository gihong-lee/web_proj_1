const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const FileStore = require('session-file-store')(session)
const request = require('request');
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

const template = require('/app/lib/template')
const mysql = require('mysql');
const DB = mysql.createConnection({
	host:DB_Info.host,
	port:DB_Info.port,
	user:DB_Info.user,
	password:DB_Info.password,
	database:DB_Info.database
});

DB.connect();
const url = `http://`+ process.env.MOCK_ADDR +`:8080/`;

app.get('/Create',(req,res) => {
	request({url: url,method: "GET"})
	if(!req.session.is_logined) {
	  res.redirect(process.env.REDIRECT_ADDR);
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
  
app.post('Create/create_process',(req, res) => {
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

app.listen(port);