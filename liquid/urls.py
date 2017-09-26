from django.conf.urls import url
from django.contrib import admin

from liquid import views as liquid_views

urlpatterns = [
    url(r'^ffmpeg$', liquid_views.FFMPEG_submit, name='ffmpeg'),
    # url(r'^soundcloud', liquid_views.FFMPEG_submit, name='ffmpeg'),
    url(r'^ffmpeg-submit', liquid_views.FFMPEG_submit, name='ffmpeg_submit'),
    url(r'^youtubedl-submit', liquid_views.youtube_dl_submit, name='ffmpeg_submit'),
    url(r'^soundcloud-submit', liquid_views.soundcloud_submit, name='soundcloud_submit'),
    url(r'^wget-submit', liquid_views.wget_submit, name='wget_submit'),
    url(r'^youtubedl-get-formats', liquid_views.youtube_dl_get_formats, name='youtube_dl_get_formats'),
    # Download Manager URLs
    url(r'^download-manager/subscriptions/list', liquid_views.download_manager_get_subscriptions,
        name='download_manager_get_subscriptions'),
    url(r'^download-manager/subscriptions/delete', liquid_views.download_manager_delete_subscription,
        name='download_manager_get_downloads'),
    url(r'^download-manager/downloads/list', liquid_views.download_manager_get_downloads,
        name='download_manager_get_downloads'),
    url(r'^download-manager/downloads/hide', liquid_views.hide_video_download,
        name='hide_video_download'),
    url(r'^download-manager/subscriptions/create', liquid_views.download_manager_add_subscription,
        name='add_subscription'),

    # Settings URLs
    url(r'^settings/cloudcmd/start-server', liquid_views.update_youtube_dl_settings,
        name='add_subscription'),
    url(r'^settings/get-settings', liquid_views.get_liquid_dl_settings,
        name='add_subscription'),
    url(r'^settings/cloudcmd/save', liquid_views.update_cloud_cmd_settings,
        name='add_subscription'),
    url(r'^settings/cloudcmd/get-cloudcmd', liquid_views.get_cloudcmd_settings,
        name='add_subscription'),

    url(r'^settings/youtubedl/save', liquid_views.update_youtube_dl_settings,
        name='add_subscription'),
    url(r'^settings/liquid-dl/save', liquid_views.update_liquid_dl_settings,
        name='add_subscription'),
    url(r'^settings/liquid-dl/update-dependencies', liquid_views.update_dependencies,
        name='add_subscription')
]
