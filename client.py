import requests
import time
import random

def get_target():
	match random.randrange(1,6):
		case 1: 
			return "board/"
		case 2: 
			return "topic/20"
		case 3: 
			return "Create"
		case 4: 
			return "auth/login"
		case 5: 
			return ""
	

def main():
	Base_url = "http://192.168.21.102:30588/"

	req_num = int(input("Number of Req : "))
	user = input("End User : ")

	for i in range(req_num):
		target_url = get_target()
		res = requests.get(Base_url , headers={"end-user":user})
		print(f"{i} : {target_url}")
		time.sleep(0.02)

if __name__ == "__main__":
	main()