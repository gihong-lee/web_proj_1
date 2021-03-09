const express = require('express')
const template = require('../lib/template')
const r = express.Router()



r.get('/',(req, res) => {
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

module.exports = r;