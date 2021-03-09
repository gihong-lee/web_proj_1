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

r.get('/',(req, res) =>{
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
				 '<script src="../javascript/boardApp.js"></script>');

				res.send(html);
			}
		});
  });
})

module.exports = r;