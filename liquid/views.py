# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from annoying.decorators import ajax_request
from django.shortcuts import render
from django.http import JsonResponse



def schedule(request):
    context = {}
    print("SDDDDDDDDDDDDDDDDDDDDDDdddddd")
    return render(request, 'home.html', context=context)

@ajax_request
def FFMPEG_submit(request):
    print (request.GET)
    context = {}
    return JsonResponse({})

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