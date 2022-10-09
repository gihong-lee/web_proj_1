from flask import Flask
import os

app = Flask(__name__)

@app.route('/')
def home():
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
body, html,h1,ul
{{
    margin: 0;
    padding: 0;
}}
nav{{
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0px;
    background-color: rgba(255, 255, 255, 0.445);
    box-shadow:5px,1px black;
    position: sticky;
    height: 50px;
}}
nav ul{{
    display: flex;
}}
nav ul a, nav div a{{
    margin: 10px 25px;
    color: gray;
}}
nav ul a:hover{{
    color: black;
}}
nav div .nav_join{{
    background-color: blue;
    color: white;
    padding: 5px 35px;
    border-radius: 5px;
}}
nav div .nav_join:hover{{
    background-color: rgba(0,0,255,0.5);
}}
.join{{
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
}}
.join div{{
    margin-top: 50px;
    font-size: 64px;
}}
.b {{
    font-size: 60px;
    color: blue;
    margin-left: 30px;
}}
.join .join-botten{{
    background-color: blue;
    width: 200px;
    height: 40px;
    font-size: 20px;
    color: white;
    text-align: center;
    border-radius: 5px;
    line-height: 40px;
}}
.join-botten:hover{{
    background-color: rgba(0,0,255,0.5);
}}
</style>
</head>
<body style="margin: 0; height: 1000px;">
    <nav>
        <ul>
            <a href="/board" class="nav_name1">Board</a>
            <a href="/Create" class="nav_name2">Create</a>
        </ul>
        <div>
            <a href="/auth/login" class = "nav_log">Log in</a>
            <a href="/auth/join" class = "nav_join">Join</a>
        </div>
    </nav>
    <div class="join">
        <div>
        Graduation
        </div>
            <span class="b">
            Lee Gi Hong
            </span>
        <h3>
           Graduation
        </h3>
        <a href="/auth/join" class="join-botten">
            Join
        </a>
    </div>
</body>
</html>'''

app.run(host='0.0.0.0',port=8000)