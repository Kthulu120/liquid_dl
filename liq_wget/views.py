# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.shortcuts import render


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
