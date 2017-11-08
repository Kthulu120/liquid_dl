import json
import random
import string

from liquid_dl.settings import BASE_DIR
import os
from passlib.hash import pbkdf2_sha256


def update_password(password):
    os.chdir(BASE_DIR)
    with open('settings.json', "r+") as data_file:
        data = (json.load(data_file))
    data['liquid-dl']["password"] = password
    with open("settings.json", "w") as jsonFile:
        json.dump(data, jsonFile)


def create_new_cloudcmd_password(N=10):
    os.chdir(BASE_DIR)
    cmd = "node node_modules/cloudcmd/bin/cloudcmd ----username admin --password "
    # new_pswrd = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(N))
    cmd += "admin"
    with open('settings.json', "r+") as data_file:
        data = (json.load(data_file))
        data["cloudcmd"]["password"] = "admin"
    with open("settings.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    os.system(cmd)
