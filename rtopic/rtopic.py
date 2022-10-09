from flask import Flask
import os
import random

app = Flask(__name__)

@app.route('/topic/<tid>')
def rtopic(tid):
    oper = float(os.environ['OPER'])

    if random.randrange(1,101) < oper:
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
    else:
        return "Error\n\nStatus code : 5xx", 500


app.run(host='0.0.0.0',port=8000)
