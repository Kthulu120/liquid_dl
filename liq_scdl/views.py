# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from annoying.decorators import ajax_request
from django.http import JsonResponse
from django.shortcuts import render

from liquid.workers.soundcloud import SoundcloudDLWorker


@ajax_request
def soundcloud_submit(request):
    """
    Tells the liquid-dl to download from soundcloud using sc-dl with the given url and output path.
    :param request: The client ajax request
    :return: The soundcloud submit
    """
    try:
        response = request.GET
        # TODO: Clean Up and Get rid of unnecessary code
        variable_dictionary = {
            "url": response.get('url'),
            "output_path": response.get('output_path'),
            "is_playlist_or_song": response.get('is_playlist_or_song') in ['true'],
            "only_mp3": response.get('only_mp3') in ['true'],
            "add_artist_to_files": response.get('add_artist_to_files') in ['true'],
            "continue_if_exists": response.get('download_artist') in ['true'],
            "download_all_tracks_and_reposts": response.get('download_all_tracks_and_reposts') in ['true'],
            "download_user_uploads": response.get('download_user_uploads') in ['true'],
            "download_favorites": response.get('download_favorites' in ['true']),
            "download_playlist": response.get('download_playlist') in ['true'],
            "download_like_and_owned_playlists": response.get('url') in ['true'],
            "downloaded_commented_tracks": response.get('downloaded_commented_tracks') in ['true']
        }
        soundcloud_dl = SoundcloudDLWorker(url=variable_dictionary["url"],
                                           output_path=variable_dictionary["output_path"],
                                           is_playlist_or_song=variable_dictionary["is_playlist_or_song"],
                                           continue_if_exists=variable_dictionary["continue_if_exists"],
                                           only_mp3=variable_dictionary["only_mp3"],
                                           add_artist_to_files=variable_dictionary["add_artist_to_files"],
                                           download_all_tracks_and_reposts=variable_dictionary[
                                               "download_all_tracks_and_reposts"],
                                           download_user_uploads=variable_dictionary["download_user_uploads"],
                                           download_favorites=variable_dictionary["download_favorites"],
                                           download_playlist=variable_dictionary["download_playlist"],
                                           download_like_and_owned_playlists=variable_dictionary[
                                               "download_like_and_owned_playlists"],
                                           downloaded_commented_tracks=variable_dictionary[
                                               "downloaded_commented_tracks"]
                                           )
        soundcloud_dl.make_command()
    except Exception as e:
        print (e)
    return JsonResponse({"success": "Downloaded Files successfully"})
