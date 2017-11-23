from django.conf.urls import url
from django.contrib import admin
from liq_dl_manager import views

urlpatterns = [
    url(r'^subscriptions/list', views.download_manager_get_subscriptions,
        name='download_manager_get_subscriptions'),
    url(r'^subscriptions/delete', views.download_manager_delete_subscription,
        name='download_manager_get_downloads'),
    url(r'^downloads/list', views.download_manager_get_downloads,
        name='download_manager_get_downloads'),
    url(r'^downloads/hide', views.hide_video_download,
        name='hide_video_download'),
    url(r'^subscriptions/create', views.download_manager_add_subscription,
        name='add_subscription'),
]
