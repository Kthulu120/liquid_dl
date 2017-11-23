# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.shortcuts import render

# Submission Views for forms
from liquid.workers.ffmpeg import LinuxFfmpegConversionWorker, WindowsFfmpegConversionWorker


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
