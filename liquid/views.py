# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
import traceback
from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.shortcuts import render

from liquid.workers.ffmpeg import LinuxFfmpegConversionWorker, WindowsFfmpegConversionWorker
from liquid.workers.soundcloud import SoundcloudDLWorker
from liquid.workers.wget import WgetDLWorker
from liquid.workers.youtube_dl import YoutubeDLWorker


def schedule(request):
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


@ajax_request
def imgur_submit(request):
    print (request.GET)
    context = {}
    return JsonResponse({})


@ajax_request
def wget_submit(request):
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
    print (request.GET)
    context = {}
    return JsonResponse({})


@ajax_request
def youtube_dl_get_formats(request):
    try:
        response = request.GET
        print(response)
        variable_dictionary = {
            "url": response.get('url'),
            "output_path": response.get('output_path'),
            "new_folder_name": response.get('new_folder_name'),
            "make_folder": response.get('make_folder') in ['true'],
            "is_playlist": response.get('is_playlist') in ['true'],
        }
        print(variable_dictionary)
        return JsonResponse(YoutubeDLWorker.get_formats(self=None, url=variable_dictionary["url"],
                                                        folder_path=variable_dictionary["output_path"],
                                                        make_folder=variable_dictionary["make_folder"],
                                                        new_folder_name=variable_dictionary["new_folder_name"]))
    except Exception as e:
        traceback.print_exc()
        return JsonResponse({'error': e.message})
