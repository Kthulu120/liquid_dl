import json
import random
import string

from liquid_dl.settings import BASE_DIR
import os
from passlib.hash import pbkdf2_sha256


def create_new_cloudcmd_password(N=10):
    os.chdir(BASE_DIR)
    cmd = "node node_modules/cloudcmd/bin/cloudcmd --username admin --password "
    new_pswrd = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(N))
    cmd += "admin"
    with open('settings.json', "r+") as data_file:
        data = (json.load(data_file))
        data["cloudcmd"]["password"] = "admin"
    with open("settings.json", "w") as jsonFile:
        json.dump(data, jsonFile)
    os.system(cmd + " --save")


def generate_new_apikey(n=10):
    """
    Generates a new apiKey and places it into the settings.json file
    :type n: int
    :param n: the number of characters the api key should be, default is 10
    :return: void
    """
    os.chdir(BASE_DIR)
    new_key = ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(n))
    with open('settings.json', "r+") as data_file:
        data = (json.load(data_file))
        data["liquid-dl"]["apiKey"] = new_key
    with open("settings.json", "w") as jsonFile:
        json.dump(data, jsonFile)
