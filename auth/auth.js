const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const FileStore = require('session-file-store')(session)

const DB_Info = require('/app/lib/DB_Info')

const port = 8000;
const app = express();

app.use(cookieParser());
app.use(bodyParseapp.json());
app.use(session({
  secret: DB_Info.password,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true},
  store: new FileStore()
}))
app.use(bodyParseapp.urlencoded({ extended: false }));
app.use('/app/javascript',express.static('javascript'));

const template = require('/app/lib/template')

const DB = mysql.createConnection({
  host:DB_Info.host,
  port:DB_Info.port,
  user:DB_Info.user,
  password:DB_Info.password,
  database:DB_Info.account
})

DB.connect()

app.get('/auth/login',(req, res) => {
  const html = template.html('Login','','',
  `<form action= "/auth/login/login_process" method ="post">
  <input type="text"name = "aid" placeholder="ID">
  <input type="password"name = "password" placeholder="PASSWORD">
  <input type="submit">
  </form>`,'');
  res.send(html);
})

app.post('/auth/login/login_process',(req, res) => {
  const data = req.body;
  console.log(data);
  DB.query('SELECT id, name FROM user WHERE user_id = ? AND password = ?',[data.aid, data.password], (err, result) => {
    if(err) throw err;
    if(result[0]) {
      req.session.is_logined = true;
      req.session.userId = result[0].id;
      req.session.name = result[0].name;
      req.session.save((err) => {
        if(err) throw err;
        res.redirect('/');
      });
    } else {
      res.redirect('/auth/login');
    }
  })
})

app.get('/auth/logout_process', (req, res) => {
  req.session.destroy((err) => {
    if(err) throw err;
    res.redirect('/')
  })
})

app.get('/auth/join',(req, res) => {
  const html = template.html('Join', '', '',
  `<form action="/auth/join_process" method="post">
    <p>
    <input type="text" name="user_id" placeholder="ID">
    <button type="button" id = "idCheck">중복확인</button>
    </p>
    <p><input id="PW" type="password" name="password" placeholder="PASSWORD"></p>
    <p>
      <input id="PWCheck" type="password" placeholder="PASSWORD Check">
      <span id="PWMsg" style="color:red;">비밀번호가 일치하지 않습니다.</span>
    </p>
    <p>
      <input type="text" name="name" placeholder="Nickname">
      <button type="button" id = "nameCheck">중복확인</button>
    </p>
    <input type="submit">
  </form>`, '<script src="../javascript/joinApp.js"></script>');
  res.send(html);
})

app.get('/auth/join/check_dup', (req, res) => {
  const value = req.query.value;
  const isId = req.query.isId;
  
  let query = 'SELECT * FROM user WHERE ';
  if(isId === 'true') {
    query += `user_id = ?;`;
  } else {
    query += `name = ?;`;
  }
  console.log(query)
  DB.query(query,[value], (err, result) => {
    if(err) throw err;
    if(result[0]){//중복
      res.json({ok:false});
    } else {//사용가능
      res.json({ok:true});
    }
  })
})//수정 => get

app.post('/auth/join_process',(req, res) => {
  const data = req.body;
  console.log(data);
  DB.query('INSERT INTO user (user_id, password, name) VALUES (?, ?, ?)', 
  [data.user_id, data.password, data.name], (err, result) => {
    if(err) throw err;
    console.log(result[0])
    res.redirect('/auth/login');
  })
})

app.get('/auth/account/:uid', (req, res) => {
  if(!req.session.is_logined) res.status(401).send()
  else{
    const html = template.account.html(req.session)
    res.send(html)
  }
})

app.get('/auth/account/:uid/check_dup', (req, res) => {//중복 검사 url 구조가 이상함..
  DB.query('SELECT * FROM user WHERE name = ?;',[req.query.name], (err, result) => {
    if(err) throw err;
    console.log(result)
    if(result[0]){//중복
      res.json({ok:false});
    } else {//사용가능
      res.json({ok:true});
    }
  })
})

app.patch('/auth/account/:uid', (req, res) => {
  const uid = Number(req.params.uid);
  const body = req.body;
  if(body.isPW){// pw 변경이면
    const lastPW = body.lastPW;
    const newPW = body.newPW;
    
    DB.query('SELECT password FROM user WHERE id = ?;', [uid], (PWerr, PW) => {
      if(PWerr) throw PWerr;
      if(PW[0].password !== lastPW) {
        res.status(401).send();
        return false;
      }
      DB.query('UPDATE user SET password = ? WHERE id =?;', [newPW, uid], (err, result) =>{
        if(err) throw err;
        res.status(201).send()
      })
    })
  }else {// nickname 변경이면
    const newName = body.name;
    DB.query('UPDATE user SET name = ? WHERE id =?;', [newName, uid], (err, result) =>{
      if(err) throw err;
      req.session.name = newName;
      req.session.save((err1) => {
        if(err1) throw err1;
        res.status(201).send()
      });
    })
  }
  
})

app.delete('/auth/account/:uid', (req, res) => {
  const uid = Number(req.params.uid);

  DB.query('SELECT password FROM user WHERE id = ?;', [uid], (PWerr, PW) => {
    if(PWerr) throw PWerr;
    if(PW[0].password !== req.body.delPW) {
      res.status(401).send();
      return false;
    }
    DB.query('DELETE FROM user WHERE id = ?;', [uid], (err1, accResult) =>{
      if(err1) throw err1;
      req.session.destroy((err) => {
        if(err) throw err;
        res.status(201).send()
      })
      DB.query('DELETE FROM ex_database.topic WHERE author_id = ?;', [uid], (err2, topResult) =>{
        if(err2) throw err2;
        DB.query('DELETE FROM ex_database.comment WHERE author_id = ?;', [uid], (err3, comResult) =>{
          if(err3) throw err3;
        })
      })
    })
  })
})

app.listen(port);