from flask import Flask
import os

app = Flask(__name__)

@app.route('/topic/<tid>')
def rtopic(tid):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>{tid} Risky</h1>
    <a href="/">Home</a>
</body>
</html>'''


app.run(host='0.0.0.0',port=8000)