# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from annoying.decorators import ajax_request
from django.shortcuts import render
from django.http import JsonResponse

from liquid.ffmpeg import LINUX_FFMPEG_CONVERTER, WINDOWS_FFMPEG_CONVERTER
from liquid.workers.soundcloud import SOUNDCLOUD_DL


def schedule(request):
    print("main studd")
    context = {}
    return render(request, 'home.html', context=context)


@ajax_request
def FFMPEG_submit(request):
    clean_result = 0
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
            LINUX_FFMPEG_CONVERTER.batch_convert(folder_path=variable_dictionary['input_path'],
                                                 input_format=variable_dictionary['input_format'],
                                                 output_fomat=variable_dictionary['output_format'],
                                                 convert=variable_dictionary['folder_conversion'])
            LINUX_FFMPEG_CONVERTER.convert_single_file(folder_path=variable_dictionary['input_path'],
                                                       input_format=variable_dictionary
                                                       ['input_format'],
                                                       output_fomat=variable_dictionary['output_format'],
                                                       convert=not (variable_dictionary['folder_conversion']))
            if variable_dictionary['delete_old_files'] and variable_dictionary["folder_conversion"]:
                LINUX_FFMPEG_CONVERTER.clean_old_files(folder_path=variable_dictionary['input_path'],
                                                       input_format=variable_dictionary["input_format"],
                                                       delete=variable_dictionary["delete_old_files"])
        else:
            WINDOWS_FFMPEG_CONVERTER.convert_single_file(folder_path=variable_dictionary['input_path'],
                                                         input_format=variable_dictionary
                                                         ['input_format'],
                                                         output_fomat=variable_dictionary['output_format'],
                                                         convert=not (variable_dictionary['folder_conversion']))
            WINDOWS_FFMPEG_CONVERTER.batch_convert(folder_path=variable_dictionary['input_path'],
                                                   input_format=variable_dictionary
                                                   ['input_format'],
                                                   output_fomat=variable_dictionary['output_format'],
                                                   convert=(variable_dictionary['folder_conversion']))
            if variable_dictionary['delete_old_files'] and variable_dictionary["folder_conversion"]:
                WINDOWS_FFMPEG_CONVERTER.clean_old_files(folder_path=variable_dictionary['input_path'],
                                                         input_format=variable_dictionary["input_format"],
                                                         delete=variable_dictionary["delete_old_files"])

    except Exception as e:
        d = (e.message)
        return JsonResponse({'error': str(d)})
    return JsonResponse({"success": "Conversion of Files was successful"})


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

        soundcloud_dl = SOUNDCLOUD_DL(url=variable_dictionary["url"], output_path=variable_dictionary["output_path"],
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
                                      downloaded_commented_tracks=variable_dictionary["downloaded_commented_tracks"]
                                      )
        soundcloud_dl.make_command()
    except Exception as e:
        print (e)
    return JsonResponse({"success": "Downloaded Files successfully"})


@ajax_request
def imgur_submit(request):
    print (request.GET)
    context = {}
    return JsonResponse({})


@ajax_request
def wget_submit(request):
    print (request.GET)
    context = {}
    return JsonResponse({})


@ajax_request
def youtube_dl_submit(request):
    print (request.GET)
    context = {}
    return JsonResponse({})
