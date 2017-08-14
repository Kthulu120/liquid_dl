# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render


# Create your views here.

def schedule(request):
    context = {}
    print("SDDDDDDDDDDDDDDDDDDDDDDdddddd")
    return render(request, 'home.html', context=context)
def FFMPEG_submit(request):
    context = {}
