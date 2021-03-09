const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const FileStore = require('session-file-store')(session)

const DB_Info = require('./lib/DB_Info')
const homeRouter = require('./routers/home')
const boardRouter = require('./routers/board')
const topicRouter = require('./routers/topic')
const createRouter = require('./routers/create')
const authRouter = require('./routers/auth')

const port = 3000;
const app = express();

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
  secret: DB_Info.password,
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true},
  store: new FileStore()
}))
app.use('/javascript',express.static('javascript'));

app.use('/',homeRouter);
app.use('/topic',topicRouter);
app.use('/board',boardRouter);
app.use('/Create',createRouter);
app.use('/auth',authRouter);

app.listen(port);