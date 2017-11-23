from django.conf.urls import url
from django.contrib import admin
from liq_cloud_cmd import views

urlpatterns = [
    url(r'^settings/start-server', views.start_cloudcmd,
        name='start_cloudcmd_server'),
    url(r'^settings/save', views.update_cloud_cmd_settings,
        name='save_cloudcmd_settings'),
    url(r'^settings/get', views.get_cloudcmd_settings,
        name='get_cloudcmd_settings'),
]
