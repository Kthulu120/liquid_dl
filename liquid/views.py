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
from liquid.auth.usermanagement import update_password, create_new_cloudcmd_password
from liquid.forms import UserCreateForm
from liquid.models import VideoSubscription, YoutubedlVideo
from liquid.workers.utility import update_requirement_dependencies
from liquid_dl import settings as liquid_dl_settings
from liquid.workers.ffmpeg import LinuxFfmpegConversionWorker, WindowsFfmpegConversionWorker
from liquid.workers.multiprocessor_download_worker import youtube_dl_multiprocessor
from liquid.workers.single_thread_download_worker import youtube_dl_single_thread
from liquid.workers.soundcloud import SoundcloudDLWorker
from liquid.workers.wget import WgetDLWorker
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
    :param request: 
    :return: a render of the home page
    """
    context = {}
    return render(request, 'home.html', context=context)


def webtor(request):
    context = {}
    return render(request, 'webtorrent.html', context=context)


def login_user(request):
    """
    Checks if the current username is admin and if so then we redirect them to the the UserCreateForm so that we can secure the application
    :param request: 
    :return: 
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


# Submission Views for forms
@login_required
@ajax_request
def FFMPEG_submit(request):
    """
    Soon to be refactored due to messy conventions and hackey manner of doing things
    
    Submission form for Ffmpeg
    :param request: 
    :return: 
    """
    try:
        response = request.GET
        variable_dictionary = {
            "input_format": response.get('input_format'),
            "output_format": response.get('output_format'),
            "operating_system": response.get('operating_system'),
            "input_path": response.get('input_path'),
            "delete_old_files": (response.get('delete_old_files') in ['true']),
            "folder_conversion": (response.get('folder_conversion') in ['true'])
        }
        print(variable_dictionary)
        if variable_dictionary["operating_system"] is "LINUX":
            LinuxFfmpegConversionWorker.batch_convert(folder_path=variable_dictionary['input_path'],
                                                      input_format=variable_dictionary['input_format'],
                                                      output_fomat=variable_dictionary['output_format'],
                                                      convert=variable_dictionary['folder_conversion'])
            LinuxFfmpegConversionWorker.convert_single_file(folder_path=variable_dictionary['input_path'],
                                                            input_format=variable_dictionary
                                                            ['input_format'],
                                                            output_fomat=variable_dictionary['output_format'],
                                                            convert=not (variable_dictionary['folder_conversion']))
            if variable_dictionary['delete_old_files'] and variable_dictionary["folder_conversion"]:
                LinuxFfmpegConversionWorker.clean_old_files(folder_path=variable_dictionary['input_path'],
                                                            input_format=variable_dictionary["input_format"],
                                                            delete=variable_dictionary["delete_old_files"])
        else:
            WindowsFfmpegConversionWorker.convert_single_file(folder_path=variable_dictionary['input_path'],
                                                              input_format=variable_dictionary
                                                              ['input_format'],
                                                              output_fomat=variable_dictionary['output_format'],
                                                              convert=not (variable_dictionary['folder_conversion']))
            WindowsFfmpegConversionWorker.batch_convert(folder_path=variable_dictionary['input_path'],
                                                        input_format=variable_dictionary
                                                        ['input_format'],
                                                        output_fomat=variable_dictionary['output_format'],
                                                        convert=(variable_dictionary['folder_conversion']))
            if variable_dictionary['delete_old_files'] and variable_dictionary["folder_conversion"]:
                WindowsFfmpegConversionWorker.clean_old_files(folder_path=variable_dictionary['input_path'],
                                                              input_format=variable_dictionary["input_format"],
                                                              delete=variable_dictionary["delete_old_files"])

    except Exception as e:
        print (e.message)
        return JsonResponse({'error': str(e.message)})
    return JsonResponse({"success": "Conversion of Files was successful"})


@login_required
@ajax_request
def soundcloud_submit(request):
    try:
        response = request.GET
        print(response)
        variable_dictionary = {
            "url": response.get('url'),
            "output_path": response.get('output_path'),
            "is_playlist_or_song": response.get('is_playlist_or_song') in ['true'],
            "only_mp3": response.get('only_mp3') in ['true'],
            "add_artist_to_files": response.get('add_artist_to_files') in ['true'],
            "continue_if_exists": response.get('download_artist') in ['true'],
            "download_all_tracks_and_reposts": response.get('download_all_tracks_and_reposts') in ['true'],
            "download_user_uploads": response.get('download_user_uploads') in ['true'],
            "download_favorites": response.get('download_favorites' in ['true']),
            "download_playlist": response.get('download_playlist') in ['true'],
            "download_like_and_owned_playlists": response.get('url') in ['true'],
            "downloaded_commented_tracks": response.get('downloaded_commented_tracks') in ['true']
        }
        print (variable_dictionary)

        soundcloud_dl = SoundcloudDLWorker(url=variable_dictionary["url"],
                                           output_path=variable_dictionary["output_path"],
                                           is_playlist_or_song=variable_dictionary["is_playlist_or_song"],
                                           continue_if_exists=variable_dictionary["continue_if_exists"],
                                           only_mp3=variable_dictionary["only_mp3"],
                                           add_artist_to_files=variable_dictionary["add_artist_to_files"],
                                           download_all_tracks_and_reposts=variable_dictionary[
                                               "download_all_tracks_and_reposts"],
                                           download_user_uploads=variable_dictionary["download_user_uploads"],
                                           download_favorites=variable_dictionary["download_favorites"],
                                           download_playlist=variable_dictionary["download_playlist"],
                                           download_like_and_owned_playlists=variable_dictionary[
                                               "download_like_and_owned_playlists"],
                                           downloaded_commented_tracks=variable_dictionary[
                                               "downloaded_commented_tracks"]
                                           )
        soundcloud_dl.make_command()
    except Exception as e:
        print (e)
    return JsonResponse({"success": "Downloaded Files successfully"})


@login_required
@ajax_request
def wget_submit(request):
    """
    Submission of the wget form for processing
    :param request: 
    :return: 
    """
    try:
        response = request.GET
        variable_dictionary = {
            "url": response.get('url'),
            "output_path": response.get('output_path'),
            "depth_level": response.get('depth_level'),
            "recursive": response.get('recursive') in ['true'],
            "no_parent": response.get('no_parent') in ['true'],
            "no_clobber": response.get('no_clobber') in ['true'],
            "robots": response.get('robots') in ['true'],
            "mirror": response.get('mirror') in ['true'],
            "accept": response.get('accept') in ['true'],
            "reject": response.get('reject') in ['true'],
            "accept_values": json.loads(response.get('accept_values')),
            "reject_values": json.loads(response.get('reject_values')),
            "check_certificate": response.get('check_certificate') in ['true'],
        }
        # print (variable_dictionary)

        wget_dl = WgetDLWorker(url=variable_dictionary["url"], output_path=variable_dictionary["output_path"],
                               depth_level=variable_dictionary["depth_level"],
                               recursive=variable_dictionary["recursive"],
                               no_parent=variable_dictionary["no_parent"],
                               no_clobber=variable_dictionary["no_clobber"],
                               robots=variable_dictionary["robots"],
                               mirror=variable_dictionary["mirror"],
                               accept=variable_dictionary["accept"],
                               reject=variable_dictionary["reject"],
                               check_certificate=variable_dictionary["check_certificate"],
                               accept_values=variable_dictionary["accept_values"],
                               reject_values=variable_dictionary["reject_values"]
                               )
        wget_dl.make_command()
    except Exception as e:
        print (e)
    return JsonResponse({"success": "Downloaded Files successfully"})


@ajax_request
def youtube_dl_submit(request):
    """
    Submission of the youtube-dl form for processing
    :param request: ajax request of form
    :return: 
    """
    try:
        response = request.GET
        variable_dictionary = {
            "url": response.get('url'),
            "output_path": response.get('output_path'),
            "new_folder_name": response.get('new_folder_name'),
            'chosen_formats': ast.literal_eval(str(response.get('chosen_formats'))),
            "make_folder": response.get('make_folder') in ['true'],
            "is_playlist": response.get('is_playlist') in ['true'],
        }
        if isinstance(variable_dictionary['chosen_formats'], list):
            print(variable_dictionary['chosen_formats'])
            if liquid_dl_settings.YOUTUBE_DL_MULTIPROCESSING:
                youtube_dl_multiprocessor(download_dir=variable_dictionary["output_path"],
                                          make_dir={
                                              'make_dir': variable_dictionary["make_folder"],
                                              'directory_name': variable_dictionary["new_folder_name"]},
                                          info_dict=variable_dictionary,
                                          links=variable_dictionary['chosen_formats'])
                return JsonResponse({"success": "Files Finished Downloading, probably should verify though"})
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'error': e.message})


@login_required
@ajax_request
def youtube_dl_get_formats(request):
    """
    Create a dictionary and sends the the dictionary values to a YoutubeDL worker that grabs the formats
    :param request: ajax request
    :return: JsonResponse of available formats
    """
    try:
        response = request.GET
        variable_dictionary = {
            "url": response.get('url'),
            "output_path": response.get('output_path'),
            "new_folder_name": response.get('new_folder_name'),
            "make_folder": response.get('make_folder') in ['true'],
            "is_playlist": response.get('is_playlist') in ['true'],
        }
        return JsonResponse(YoutubeDLWorker.get_formats(self=None, url=variable_dictionary["url"],
                                                        folder_path=variable_dictionary["output_path"],
                                                        make_folder=variable_dictionary["make_folder"],
                                                        new_folder_name=variable_dictionary["new_folder_name"]))
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'error': e.message})


# Download Manager Views

@login_required
@ajax_request
def download_manager_get_downloads(request):
    """
    Request all the current 'front-end visible' downloads in the database and return the serialized version of all of 
    those objects
    :param request: 
    :return: JsonResponse of serialized YoutubeDLVideo objects
    """
    subscriptions = YoutubedlVideo.objects.filter(front_end_visible=True)
    data = serializers.serialize("json", subscriptions)
    print(data)
    return JsonResponse({
        "downloads": data
    })


@login_required
@ajax_request
def download_manager_get_subscriptions(request):
    subscriptions = VideoSubscription.objects.filter(front_end_visible=True)
    data = serializers.serialize("json", subscriptions)
    print(data)
    return JsonResponse({
        "subscriptions": data
    })


@login_required
@ajax_request
def download_manager_delete_subscription(request):
    """
    Update a Subscription typically just a folder path
    :param request: Ajax request
    :return: 
    """
    response = request.GET
    print(response.get("url"))
    video = VideoSubscription.objects.get(url=response.get("url"))
    video.delete()
    return JsonResponse({"success": "Ended Subscription"})


@login_required
@ajax_request
def download_manager_add_subscription(request):
    """
    Adds Subscription using YoutubeDLWorker
    :param request: Ajax request
    :return: 
    """
    response = request.GET
    # TODO: Get rid of unnecessary variable dictionary
    variable_dictionary = {
        "url": response.get('url'),
        "provider": response.get('provider'),
        "folder_path": response.get("folder_path"),
        "subscription_name": response.get('subscription_name'),
        "output_template": response.get('output_template', "%(title)s-%(id)s.%(ext)s"),
    }
    params = {
        'folder_path': variable_dictionary["folder_path"],
        'provider': variable_dictionary["provider"],
        'subscription_name': variable_dictionary[
            "subscription_name"],
        'output_template': variable_dictionary[
            "output_template"]
    }
    subscription = YoutubeDLWorker(url=variable_dictionary["url"], params=params)
    subscription = subscription.create_subscription()
    YoutubeDLWorker.download_subscription_in_directory(subscription)
    return JsonResponse({"success": "Subscription was successfully created"})


# Settings Views

@login_required
@ajax_request
def update_dependencies(request):
    """
    Updates the dependencies for the entire application (youtube-dl and scdl)
    :param request: Ajax request
    :return: 
    """
    update_requirement_dependencies()
    return JsonResponse({"success": "Successfully Updated"})


@ajax_request
def update_default_directory(request):
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
    :return: 
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
    :return: 
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


@login_required
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


@login_required
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


@login_required
@ajax_request
def update_youtube_dl_settings(request):
    """
    Updates the dependencies for the entire application (youtube-dl and scdl)
    :param request: Ajax request
    :return: 
    """

    with open("settings.json") as some_settings:
        response = request.GET
        print (response)
        new_settings = json.loads(some_settings.read())
        print(new_settings)
        some_settings.close()

    return JsonResponse({"success": "Liquid-dl Successfully Updated"})


# Utility Views

@login_required
@ajax_request
def hide_video_download(request):
    """
    hides a video download
    :param request: 
    :return: 
    """
    response = request.GET
    video = YoutubedlVideo.objects.get(filename=response.get("url"))
    video.front_end_visible = False
    video.save()
    return JsonResponse({"success": "Hid Video"})


@login_required
@ajax_request
def start_cloudcmd(request):
    """
    Start Cloudcmd
    :param request: Ajax request
    :return: 
    """
    cmd = "node node_modules/cloudcmd/bin/cloudcmd --one-panel-mode --auth --port "
    with open("settings.json") as some_settings:
        new_settings = json.loads(some_settings.read())
        some_settings.close()
    if new_settings["cloudcmd"]["initial_random_password_set"] == False:
        create_new_cloudcmd_password()
        new_settings["cloudcmd"]["initial_random_password_set"] = True
    cmd += new_settings["cloudcmd"]["port"]
    with open("settings.json", "w") as jsonFile:
        json.dump(new_settings, jsonFile)
        jsonFile.close()
    os.system(cmd)
    return JsonResponse({"success": "Cloudcmd Server Started"})


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


@login_required
def auth_password(request):
    password = request.GET.get('ps')
    update_password(password)


# Torrent Views
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
