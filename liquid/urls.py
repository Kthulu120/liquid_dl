from django.conf.urls import url
from django.contrib import admin

from liquid import views as liquid_views

urlpatterns = [
    url(r'^ffmpeg$', liquid_views.FFMPEG_submit, name='ffmpeg'),
    url(r'^soundcloud', liquid_views.FFMPEG_submit, name='ffmpeg'),
    url(r'^ffmpeg$', liquid_views.FFMPEG_submit, name='ffmpeg'),
    url(r'^ffmpeg$', liquid_views.FFMPEG_submit, name='ffmpeg')

]