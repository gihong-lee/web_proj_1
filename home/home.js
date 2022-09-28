const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const FileStore = require('session-file-store')(session)

const DB_Info = require('/app/lib/DB_Info')

const port = 3000;
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

app.get('/',(req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
  </head>
  <body>
    ${template.isLogined(req, res)}
    <h1>Home</h1>
    <div>
      <a href="/board">Board</a>
      <a href="/Create">create</a>
    </div>

  </body>
  </html>
  `;

    res.send(html);
});

app.listen(port);