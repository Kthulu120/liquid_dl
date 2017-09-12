# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Video(models.Model):
    """
    The video model
    """
    url = models.CharField(max_length=512, unique=True)
    download_status = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    download_speed = models.CharField(max_length=32, default='N/A', null=True, blank=True)
    download_percentage = models.CharField(max_length=16, default='N/A', null=True, blank=True)
    total_size = models.CharField(max_length=16, default='N/A', null=True, blank=True)
    filename = models.CharField(max_length=256, null=True, blank=True)
    eta = models.CharField(max_length=32, default='N/A', null=True, blank=True)
