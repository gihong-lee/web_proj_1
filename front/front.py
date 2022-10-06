from flask import Flask, request
import requests
import os

app = Flask(__name__)

home_addr = os.environ['HOME_ADDR']
board_addr = os.environ['BOARD_ADDR']
topic_addr = os.environ['TOPIC_ADDR']
create_addr = os.environ['CREATE_ADDR']
auth_addr = os.environ['AUTH_ADDR']
update_addr = os.environ['UPDATE_ADDR']


def data_parsing(data):
    req_data = {}
    splited_data = str(data)[2:][:-1].split("&")

    for item in splited_data:
        split_item = item.split("=")
        key, val =  split_item[0], split_item[-1]

        req_data[key] = val
    return req_data

@app.route('/')
def home():
    req = requests.get(home_addr+"home")
    return req.text


#####################################


@app.route('/board/')
def board():
    req = requests.get(board_addr+"/board/")
    return req.text

#####################################

@app.route('/topic/<tid>')
def topic(tid):
    req = requests.get(topic_addr+f"/topic/{tid}")
    return req.text

# @app.route('/topic/<tid>')
# def topic_del(tid):
#     req = requests.get(topic_addr+f"/{tid}")
#     return req.text

# @app.route('/topic/<tid>')
# def topic(tid):
#     req = requests.get(topic_addr+f"/{tid}")
#     return req.text

# @app.route('/topic/<tid>')
# def topic(tid):
#     req = requests.get(topic_addr+f"/{tid}")
#     return req.text

#####################################


@app.route('/Create')
def create():
    req = requests.get(create_addr+'/Create')
    return req.text


#####################################

@app.route('/auth/login')
def login():
    req = requests.get(auth_addr+"/auth/login")
    return req.text

@app.route('/auth/login/login_process', methods = ['POST'])
def login_process():
    data = request.get_data()
    req_data = data_parsing(data)
    req = requests.post(auth_addr+"/auth/login/login_process", data = req_data)
    return req.text

@app.route('/auth/logout_process')
def logout():
    req = requests.get(auth_addr+"/auth/logout_process")
    return req.text

@app.route('/auth/join')
def join():
    req = requests.get(auth_addr+"/auth/join")
    return req.text

@app.route('/auth/join_process', methods = ['POST'])
def join_process():
    data = request.get_data()
    req_data = data_parsing(data)
    req = requests.post(auth_addr+"/auth/join_process", data = req_data)
    return req.text

@app.route('/auth/account/<uid>')
def account(uid):
    req = requests.get(auth_addr+f"/auth/account/{uid}")
    return req.text

@app.route('/update/<uid>/edit')
def update(uid):
    req = requests.get(auth_addr+f"/account/{uid}")
    return req.text

app.run(host="localhost",port=5001)
