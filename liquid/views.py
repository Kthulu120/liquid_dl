# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import ast
import json
import os
import traceback
from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.shortcuts import render
from django.core import serializers
from liquid.auth.usermanagement import create_new_cloudcmd_password, generate_new_apikey
from liquid.forms import UserCreateForm
from liquid.models import VideoSubscription, YoutubedlVideo
from liquid.workers.utility import update_requirement_dependencies
from liquid.workers.youtube_dl_worker import YoutubeDLWorker
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect


@login_required
def schedule(request):
    """
    The home view which holds settings and the development schedule
    :param request: The request from a client
    :return: a render of the home page
    """
    context = {}
    return render(request, 'home.html', context=context)


def webtor(request):
    """
    :param request:
    :return:
    """
    context = {}
    return render(request, 'webtorrent.html', context=context)


def login_user(request):
    """
    Checks if the current username is admin and if so then we redirect them to the the UserCreateForm so that we can secure the application
    :param request: The request from a client
    :return: A redirection to the login home
    """
    form = AuthenticationForm()

    if User.objects.all().exists() is False:
        user = User.objects.create_user(username='admin',
                                        email='jlennon@beatles.com',
                                        password='liquiddl')
        user = authenticate(username=u"admin", password=u"liquiddl")
        login(request, user)
        return redirect('initialize_user')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')

    return render(request, 'login.html', {
        'form': form
    })


@login_required
def signup(request):
    """
    Creates our initial user and then deletes our old generated user
    :param request takes in the UserCreateForm and cleans the data as well as doing authentication all in one
    function. If it fails once again there is a redirect and the middleware catches any unauthorized users
    """
    form = UserCreateForm()

    if request.method == 'POST':
        form = UserCreateForm(request.POST)
        if form.is_valid():
            form.save()
            user = User.objects.get(username=request.POST['username'])

            new_user = authenticate(username=form.cleaned_data['username'],
                                    password=form.cleaned_data['password1'])
            login(request, new_user)
            if User.objects.filter(username="admin").exists():
                admin = User.objects.get(username="admin")
                admin.delete()
            return redirect('home')
    return render(request, 'create_user.html', {
        'form': form
    })


# Settings Views

@login_required
@ajax_request
def update_dependencies(request):
    """
    Updates the dependencies for the entire application (youtube-dl and scdl)
    :param request: Ajax request
    :return: Json response notifying user their application has updated
    """
    # TODO: Add in try/catch returning error and reason if updating dependencies fails
    update_requirement_dependencies()
    return JsonResponse({"success": "Successfully Updated"})


@ajax_request
def update_default_directory(request):
    """
    Updates the default directory for the user where downloads goto
    :param request: Ajax Request
    :return: Notification of whether the default directory was properly updated
    """
    # TODO: Add in try/catch returning error and reason if updating fails
    with open("settings.json") as some_settings:
        response = request.GET
        new_settings = json.loads(some_settings.read())
        new_settings["liquid-dl"]["default_directory"] = response.get("file_path")
        print(some_settings)
        some_settings.close()
    with open("settings.json", "w") as jsonFile:
        json.dump(new_settings, jsonFile)
        jsonFile.close()

    return JsonResponse({"success": "Updated Default Directory"})


@login_required
@ajax_request
def get_liquid_dl_settings(request):
    """
    Updates the dependencies for the entire application (youtube-dl and scdl)
    :param request: Ajax request
    :return: Returns the settings json file in a jsonResponse
    """

    with open("settings.json") as some_settings:
        response = request.GET
        print (response)
        new_settings = json.loads(some_settings.read())
        print(some_settings)
        some_settings.close()

    return JsonResponse({"success": "Liquid-dl Successfully Updated", "data": json.dumps(new_settings)})


@login_required
@ajax_request
def update_liquid_dl_settings(request):
    """
    Updates the dependencies for the entire application (youtube-dl and scdl)
    :param request: Ajax request
    :return: Update the iquid-dl settings
    """

    with open("settings.json") as some_settings:
        response = request.GET
        new_settings = json.loads(some_settings.read())
        new_settings["liquid-dl"]["default_directory"] = response.get("file_path")
        print(some_settings)
        some_settings.close()
    with open("settings.json", "w") as jsonFile:
        json.dump(new_settings, jsonFile)
        jsonFile.close()

    return JsonResponse({"success": "Liquid-dl Updated"})

@ajax_request
def api_key_rejection(request):
    """
    Changes and Updates the api key
    :param request:
    :return:
    """
    generate_new_apikey()
    with open("settings.json") as some_settings:
        response = request.GET
        print (response)
        new_settings = json.loads(some_settings.read())
        print(some_settings)
        some_settings.close()

    return JsonResponse({"success": "Liquid-dl Successfully Updated", "data": json.dumps(new_settings)})

# Utility Views

# Torrent Views
# TODO: Finish the torrent views
def update_torrent(request):
    print (request.GET)
    return JsonResponse({"success": "Liquid-dl Successfully Updated"})


@ajax_request
def create_torrent_from_frontend(request):
    pass


@ajax_request
def pause_torrent_from_frontend(request):
    pass


@ajax_request
def destroy_torrent_from_frontend(request):
    pass


@ajax_request
def get_torrents_from_flood(request):
    pass
