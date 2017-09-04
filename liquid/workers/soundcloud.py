import os


class SoundcloudDLWorker(object):
    def __init__(self, url, output_path, is_playlist_or_song, continue_if_exists, only_mp3, add_artist_to_files,
                 download_all_tracks_and_reposts, download_user_uploads,
                 download_favorites, download_playlist, download_like_and_owned_playlists, downloaded_commented_tracks):
        """
        
        :param url: the url of the soundlcoud link we want to download from
        :param output_path: 
        :param is_playlist_or_song: 
        :param continue_if_exists: 
        :param only_mp3: 
        :param add_artist_to_files: 
        :param download_all_tracks_and_reposts: 
        :param download_user_uploads: 
        :param download_favorites: 
        :param download_playlist: 
        :param download_like_and_owned_playlists: 
        """

        """  CONFIGURATION OPTIONS """
        self.url = url
        self.output_path = output_path
        self.is_playlist_or_song = is_playlist_or_song
        self.continue_if_exists = continue_if_exists
        self.only_mp3 = only_mp3
        self.add_artist_to_files = add_artist_to_files

        """Type of download we're doing if url is not playlist or individual song"""
        self.download_all_tracks_and_reposts = download_all_tracks_and_reposts
        self.download_user_uploads = download_user_uploads
        self.download_favorites = download_favorites
        self.download_playlist = download_playlist
        self.download_like_and_owned_playlists = download_like_and_owned_playlists

    def make_command(self):
        command = "scdl -l {0} --path {1} ".format(self.url, self.output_path)
        continue_boolean = True
        if self.is_playlist_or_song:
            """ We don't add anything if playlist or song """
            continue_boolean = False
        if self.download_all_tracks_and_reposts and continue_boolean:
            command += "-a"
            continue_boolean = False
        if self.download_favorites and continue_boolean:
            command += "-f"
            continue_boolean = False
        if self.download_user_uploads and continue_boolean:
            command += "-t"
            continue_boolean = False
        if self.download_playlist and continue_boolean:
            command += "-p"
            continue_boolean = False
        try:
            process_result = os.system(command)
            if process_result is not 0:
                raise OSError("Could not download files")
        except Exception as e:
            return {'error': e}
