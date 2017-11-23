# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import os

from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.shortcuts import render


@ajax_request
def update_cloud_cmd_settings(request):
    """
    Updates the dependencies for the entire application (youtube-dl and scdl)
    :param request: Ajax request
    :return: 
    """

    with open("settings.json") as some_settings:
        response = request.GET
        new_settings = json.loads(some_settings.read())
        print(some_settings)
        some_settings.close()

    return JsonResponse({"success": "Liquid-dl Successfully Updated"})


@ajax_request
def update_cloud_cmd_settings(request):
    """
    Updates the dependencies for the entire application (youtube-dl and scdl)
    :param request: Ajax request
    :return: 
    """

    with open("settings.json") as some_settings:
        response = request.GET
        new_settings = json.loads(some_settings.read())
        print(some_settings)
        some_settings.close()
    cmd = "node node_modules/cloudcmd/bin/cloudcmd"
    return JsonResponse({"success": "Liquid-dl Successfully Updated"})


@ajax_request
def get_cloudcmd_settings(request):
    """
    Start Cloudcmd
    :param request: Ajax request
    :return: 
    """
    with open("settings.json") as some_settings:
        new_settings = json.loads(some_settings.read())
        print(new_settings)
        some_settings.close()
    return JsonResponse({"port": new_settings["cloudcmd"]["port"], "ps": new_settings["cloudcmd"]["password"]})


@ajax_request
def start_cloudcmd(request):
    """
    Start Cloudcmd
    :param request: Ajax request
    :return: 
    """
    cmd = "node node_modules/cloudcmd/bin/cloudcmd --one-panel-mode --port "
    with open("settings.json") as some_settings:
        new_settings = json.loads(some_settings.read())
        some_settings.close()
    cmd += new_settings["cloudcmd"]["port"]
    os.system(cmd)
    return JsonResponse({"success": "Cloudcmd Server Started"})
