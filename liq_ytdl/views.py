# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import ast
import json
import traceback

from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.shortcuts import render

from liquid.workers.multiprocessor_download_worker import youtube_dl_multiprocessor
from liquid.workers.youtube_dl_worker import YoutubeDLWorker
from liquid_dl import settings as liquid_dl_settings


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


@ajax_request
def chrome_extension(request):
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
            'chosen_formats': [{"id": response.get('chosen_formats[id]'), "format": "best"}],
            "make_folder": response.get('make_folder') in ['true'],
            "is_playlist": response.get('is_playlist') in ['true'],
        }
        # print(variable_dictionary)
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
