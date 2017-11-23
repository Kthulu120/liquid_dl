# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
import json
from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.core import serializers
from liquid.models import YoutubedlVideo, VideoSubscription
from liquid.workers.youtube_dl_worker import YoutubeDLWorker


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


@ajax_request
def download_manager_get_subscriptions(request):
    subscriptions = VideoSubscription.objects.filter(front_end_visible=True)
    data = serializers.serialize("json", subscriptions)
    print(data)
    return JsonResponse({
        "subscriptions": data
    })


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
