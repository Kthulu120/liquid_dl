from django.conf.urls import url, include
from django.contrib import admin
from liq_ytdl import views as liq_ytdl_views
from liq_ffmpeg import views as liq_ffmpeg_views
from liq_scdl import views as liq_scdl_views
from liq_wget import views as liq_wget_views
from liquid import views as liquid_views

"""
ALL URLS CONVENE HERE
"""
urlpatterns = [
    url(r'^login', liquid_views.login_user, name='login'),
    url(r'^signup', liquid_views.signup, name='initialize_user'),
    url(r'^webtorrent', liquid_views.webtor, name='webtor'),
    url(r'^ffmpeg$', liq_ffmpeg_views.FFMPEG_submit, name='ffmpeg'),
    # url(r'^soundcloud', liquid_views., name='ffmpeg'),
    url(r'^ffmpeg-submit', liq_ffmpeg_views.FFMPEG_submit, name='ffmpeg_submit'),
    url(r'^soundcloud-submit', liq_scdl_views.soundcloud_submit, name='soundcloud_submit'),
    url(r'^youtubedl-submit', liq_ytdl_views.youtube_dl_submit, name='youtube_dl_submit'),
    url(r'^wget-submit', liq_wget_views.wget_submit, name='wget_submit'),
    url(r'youtubedl/', include('liq_ytdl.urls')),
    url(r'^cloudcmd', include('liq_cloud_cmd.urls')),
    url(r'^download-manager/', include('liq_dl_manager.urls')),
    # Settings URLs
    url(r'^settings/get-settings', liquid_views.get_liquid_dl_settings,
        name='add_subscription'),
    url(r'^settings/youtubedl/save', liq_ytdl_views.update_youtube_dl_settings,
        name='add_subscription'),
    url(r'^settings/liquid-dl/save', liquid_views.update_liquid_dl_settings,
        name='add_subscription'),
    url(r'^settings/liquid-dl/update-dependencies', liquid_views.update_dependencies,
        name='add_subscription'),
    url(r'^settings/liquid-dl/api-key-reset', liquid_views.api_key_rejection,
        name='add_subscription'),
    url(r'^settings/liquid-dl/update-default-directory', liquid_views.update_default_directory,
        name='update_default_directory'),
    # Torrent URLS
    url(r'^torrents/torrent/receive/torrents', liquid_views.update_torrent,
        name='add_subscription'),
    url(r'^torrents/torrent/get/torrents', liquid_views.update_torrent,
        name='add_subscription'),
    url(r'^torrents/torrent/get/torrents', liquid_views.update_torrent,
        name='add_subscription'),

]
