# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.
from liquid.models import LiquidTorrent, YoutubedlVideo, VideoSubscription

admin.register(LiquidTorrent)
admin.register(YoutubedlVideo)
admin.register(VideoSubscription)
