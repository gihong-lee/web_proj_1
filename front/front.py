from email import header
from flask import Flask, request
import requests
import os

app = Flask(__name__)

home_addr = "http://" + os.environ['HOME_ADDR'] + ":8080" 
board_addr = "http://" + os.environ['BOARD_ADDR'] + ":8080"
topic_addr = "http://" + os.environ['TOPIC_ADDR'] + ":8080"
create_addr = "http://" + os.environ['CREATE_ADDR'] + ":8080"
auth_addr = "http://" + os.environ['AUTH_ADDR'] + ":8080"
update_addr = "http://" + os.environ['UPDATE_ADDR'] + ":8080"


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
    req = requests.get(home_addr, headers = {"end-user":request.headers['end-user']})
    return req.text


#####################################


@app.route('/board/')
def board():
    req = requests.get(board_addr+"/board/", headers = {"end-user":request.headers['end-user']})
    return req.text

#####################################

@app.route('/topic/<tid>')
def topic(tid):
    req = requests.get(topic_addr+f"/topic/{tid}", headers = {"end-user":request.headers['end-user']})
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
    req = requests.get(create_addr+'/Create', headers = {"end-user":request.headers['end-user']})
    return req.text


#####################################

@app.route('/auth/login')
def login():
    req = requests.get(auth_addr+"/auth/login", headers = {"end-user":request.headers['end-user']})
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
    req = requests.get(auth_addr+"/auth/join", headers = {"end-user":request.headers['end-user']})
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

app.run(host='0.0.0.0',port=5001)
