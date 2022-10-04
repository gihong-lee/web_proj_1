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

const template = require('/app/lib/template')
const DB = mysql.createConnection({
	host:DB_Info.host,
	port:DB_Info.port,
	user:DB_Info.user,
	password:DB_Info.password,
	database:DB_Info.database
});
console.log(DB_Info)
DB.connect();

app.get('/board',(req, res) =>{
	const queryData = req.query; 
	const page = template.beNumOrDef(queryData.page,0);
	let listingNum = Number(req.cookies.listingNum);
	if(!listingNum) {
		listingNum = 10;
	} else if (listingNum === NaN) {
		console.log(listingNum);
		listingNum = 10;
	}
	
	DB.query('select count(*) as cnt from topic;', (err1, result) => {
    if(err1)throw err1;
		DB.query('select * from topic order by created limit ? offset ?;', 
		[listingNum, listingNum*(page)], (err, topics) => {
			if(err) throw err;
			else {
				const lastPage = Math.ceil(result[0].cnt/listingNum);
				const context = template.borad.board(topics);
				const pageBar = template.borad.pagebar(lastPage,page);
				const html = template.html('Board',
				 template.isLogined(req, res), `
				 <select name="listing" id="listing">
					 <option value="10">10</option>
					 <option value="15">15</option>
					 <option value="20">20</option>
				 </select>`,
				 context+`<p>Page : ${page+1} </p>`, pageBar+
				 '<script src="/app/javascript/boardApp.js"></script>');

				res.send(html);
			}
		});
  });
})

app.listen(port);