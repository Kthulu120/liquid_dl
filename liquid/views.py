# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json

from annoying.decorators import ajax_request
from django.shortcuts import render
from django.http import JsonResponse

from liquid.ffmpeg import LINUX_FFMPEG_CONVERTER, WINDOWS_FFMPEG_CONVERTER


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
                                                       ['input_format'], output_fomat=variable_dictionary['output_format'],
                                                       convert=not (variable_dictionary['folder_conversion']))
            if variable_dictionary['delete_old_files'] and variable_dictionary["folder_conversion"]:
                LINUX_FFMPEG_CONVERTER.clean_old_files(folder_path=variable_dictionary['input_path'],
                                                       input_format=variable_dictionary["input_format"],
                                                       delete=variable_dictionary["delete_old_files"])
        else:
            WINDOWS_FFMPEG_CONVERTER.convert_single_file(folder_path=variable_dictionary['input_path'],
                                                       input_format=variable_dictionary
                                                       ['input_format'], output_fomat=variable_dictionary['output_format'],
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
    print (request.GET)
    context = {}
    return JsonResponse({})


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
