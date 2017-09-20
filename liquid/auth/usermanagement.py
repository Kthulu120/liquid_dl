import json

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
