# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Create your models here.

class YoutubedlVideo(models.Model):
    """
    The youtube-dl video model
    """
    url = models.CharField(max_length=512, unique=True, null=True)
    folder_path = models.CharField(max_length=1024, unique=False)
    download_status = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    download_speed = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    download_percentage = models.CharField(max_length=16, default='N/A', null=True, blank=True)
    total_size = models.CharField(max_length=16, default='N/A', null=True, blank=True)
    filename = models.CharField(max_length=256, null=True, blank=True)
    eta = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    front_end_visible = models.BooleanField(default=True, null=False, blank=False)
    subscription = models.ForeignKey('VideoSubscription', null=True, blank=True, related_name='videos')


class VideoSubscription(models.Model):
    """
    The youtube-dl subscription model
    """
    url = models.CharField(max_length=512, unique=True)
    folder_path = models.CharField(max_length=1024, unique=False)
    provider = models.CharField(max_length=64, default='N/A', null=True, blank=True)
    subscription_name = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    number_downloaded = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    total_number_files = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    download_status = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    front_end_visible = models.BooleanField(default=True, null=False, blank=False)
    output_template = models.CharField(max_length=256, unique=False, default='%(title)s-%(id)s.%(ext)s')
    format = models.CharField(max_length=64, null=True, blank=True, default="bestvideo+bestaudio")
