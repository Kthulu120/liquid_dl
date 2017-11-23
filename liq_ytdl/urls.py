from django.conf.urls import url
from django.contrib import admin
from liq_ytdl import views

urlpatterns = [
    url(r'^youtubedl-submit', views.youtube_dl_submit, name='ffmpeg_submit'),
    url(r'^youtubedl-get-formats', views.youtube_dl_get_formats, name='youtube_dl_get_formats'),
    url(r'^chrome-extension', views.chrome_extension, name='chrome_extension'),

]
