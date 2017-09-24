import os
import shutil
import tempfile

import requests
from django.http import JsonResponse
from django.test import TestCase
from rest_framework.test import APIClient

from liquid.workers.youtube_dl_worker import YoutubeDLWorker


class FFmpegConversionTest(TestCase):
    def setUp(self):
        """
        Creates a temporary directory that works on Windows and Linux then proceeds to load in a jpg image that we can manipulate the two images our converter asserting out different responses
        """
        self.test_dir = tempfile.mkdtemp(dir='/tmp')
        os.chdir(self.test_dir)
        image_one = open('bron.jpg', 'wb')
        image_one.write(requests.get('http://i.imgur.com/lr37lwn.jpg').content)
        image_one.close()
        self.image_one_path = image_one.name

        image_two = open('cersei.jpg', 'wb')
        image_two.write(requests.get('http://i.imgur.com/8ISCsdR.jpg').content)
        image_two.close()
        self.image_two_path = image_two.name

    def tearDown(self):
        """
        Remove the directory after the test after 10 seconds so you can visually observe change
        :return: 
        """
        # Uncomment to observe changes in file viewer
        # time.sleep(5)
        os.chdir('/')
        shutil.rmtree(self.test_dir)

    def test_convert_single_file_success_windows(self):
        """
        Check if file was successfully converted on windows 
        """
        client = APIClient()
        p = client.get('http://127.0.0.1/ffmpeg',
                       {u'operating_system': u'Windows', u'input_path': self.test_dir + '\\bron.jpg',
                        u'input_format': u'jpg', u'output_format': u'png', u'delete_old_files': False,
                        u'folder_conversion': False}
                       , format='json')
        print(os.getcwd())
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Conversion of Files was successful\"}")
        print(p)

    def test_convert_folder_success_no_clean_windows(self):
        """
        Check if file was successfully converted on windows 
        """
        client = APIClient()
        p = client.get('http://127.0.0.1/ffmpeg',
                       {u'operating_system': u'Windows', u'input_path': self.test_dir,
                        u'input_format': u'jpg', u'output_format': u'png', u'delete_old_files': u'false',
                        u'folder_conversion': u'true'}
                       , format='json')
        print(os.getcwd())
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Conversion of Files was successful\"}")

    def test_convert_folder_success_with_clean_windows(self):
        """
        Check if folder was successfully converted on windows and cleans the folder of all old files with old file types
        """
        client = APIClient()
        p = client.get('http://127.0.0.1/ffmpeg',
                       {u'operating_system': u'Windows', u'input_path': self.test_dir,
                        u'input_format': u'jpg', u'output_format': u'png', u'delete_old_files': u'true',
                        u'folder_conversion': u'true'}
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Conversion of Files was successful\"}")


class SoundcloudTest(TestCase):
    def setUp(self):
        """
        Creates a temporary directory that works on Windows and Linux then proceeds to use the given urls to test our methods
        """
        self.test_dir = tempfile.mkdtemp(dir='/tmp')
        os.chdir(self.test_dir)
        self.url1 = "https://soundcloud.com/intenzone-ghg"
        self.url2 = "https://soundcloud.com/ghg6"
        self.playlist_url = "https://soundcloud.com/the-dj-roar-ree/sets/chill-a-2-track-playlist"

    def tearDown(self):
        """
        Remove the directory after the test after 10 seconds so you can visually observe change
        :return: 
        """
        import time
        # Uncomment to observe changes in file viewer
        time.sleep(5)
        os.chdir('/')
        shutil.rmtree(self.test_dir)

    def test_download_artist_success(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/soundcloud-submit',
                       {
                           #  Our config options
                           u'url': self.url2, u'output_path': self.test_dir, u'is_playlist_or_song': u'false',
                           u'continue_if_exists': u'true', u'only_mp3': u'false', u'add_artist_to_files': u'false',
                           #  What type of download do we want to do if not playlist or song
                           u'download_all_tracks_and_reposts': u'false',
                           u'download_user_uploads': u'true',
                           u'download_favorites': u'false', u'download_playlist': u'false',
                           u'download_like_and_owned_playlists': u'false', u'downloaded_commented_tracks': u'false'}
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Downloaded Files successfully\"}")

    def test_download_playlist_with_mp3_only_success(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/soundcloud-submit',
                       {
                           #  Our config options
                           u'url': self.playlist_url, u'output_path': self.test_dir, u'is_playlist_or_song': u'true',
                           u'continue_if_exists': u'true', u'only_mp3': u'true', u'add_artist_to_files': u'false',
                           #  What type of download do we want to do if not playlist or song
                           u'download_all_tracks_and_reposts': u'false',
                           u'download_user_uploads': u'false',
                           u'download_favorites': u'false', u'download_playlist': u'false',
                           u'download_like_and_owned_playlists': u'false', u'downloaded_commented_tracks': u'false'}
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Downloaded Files successfully\"}")

    def test_config_options_success(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/soundcloud-submit',
                       {
                           #  Our config options
                           u'url': self.playlist_url, u'output_path': self.test_dir, u'is_playlist_or_song': u'true',
                           u'continue_if_exists': u'true', u'only_mp3': u'true', u'add_artist_to_files': u'true',
                           #  What type of download do we want to do if not playlist or song
                           u'download_all_tracks_and_reposts': u'false',
                           u'download_user_uploads': u'false',
                           u'download_favorites': u'false', u'download_playlist': u'false',
                           u'download_like_and_owned_playlists': u'false', u'downloaded_commented_tracks': u'false'}
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Downloaded Files successfully\"}")


class WgetTest(TestCase):
    def setUp(self):
        """
        Creates a temporary directory that works on Windows and Linux then proceeds to use the given urls to test our methods
        """
        self.test_dir = tempfile.mkdtemp(dir='/tmp')
        os.chdir(self.test_dir)
        self.google = "https://www.google.com"
        self.url2 = "https://soundcloud.com/ghg6"
        self.playlist_url = "https://soundcloud.com/the-dj-roar-ree/sets/chill-a-2-track-playlist"

    def tearDown(self):
        """
        Remove the directory after the test after 10 seconds so you can visually observe change
        :return: 
        """
        import time
        # Uncomment to observe changes in file viewer
        time.sleep(5)
        os.chdir('/')
        shutil.rmtree(self.test_dir)

    def test_basic_download(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/liquid-dl/wget-submit',
                       {
                           #  Our config options
                           u'url': self.google, u'output_path': self.test_dir, u'depth_level': u'0',
                           u'recursive': u'true', u'no_parent': u'false', u'check_certificate': u'false',
                           #  What type of download do we want to do if not playlist or song
                           u'no_clobber': u'false',
                           u'robots': u'true',
                           u'mirror': u'false', u'accept': u'false',
                           u'reject': u'false', }
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Downloaded Files successfully\"}")

    def test_download_no_clobber(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/wget-submit',
                       {
                           #  Our config options
                           u'url': self.google, u'output_path': self.test_dir, u'depth_level': u'0',
                           u'recursive': u'true', u'no_parent': u'true', u'check_certificate': u'false',
                           #  What type of download do we want to do if not playlist or song
                           u'no_clobber': u'true',
                           u'robots': u'true',
                           u'mirror': u'false', u'accept': u'false',
                           u'reject': u'false', }
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Downloaded Files successfully\"}")


class YoutubeDLTest(TestCase):
    def setUp(self):
        """
        Creates a temporary directory that works on Windows and Linux then proceeds to use the given urls to test our methods
        """
        self.test_dir = tempfile.mkdtemp(dir='/tmp')
        os.chdir(self.test_dir)
        self.link = "https://www.youtube.com/watch?v=A2_pboioWf0"
        self.failed_link = "https://www.whomsttube.com/watch?v=A2_pboioWf0"
        self.playlist_link = "https://www.youtube.com/playlist?list=PLqFbOPVSb976JzWOBzkKRp3gOpyOUkJAq"

    def tearDown(self):
        """
        Remove the directory after the test after 10 seconds so you can visually observe change
        :return: 
        """
        import time
        # Uncomment to observe changes in file viewer
        os.chdir('/')
        shutil.rmtree(self.test_dir)

    def test_basic_download(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/liquid-dl/youtubedl-get-formats',
                       {
                           u'url': u'https://www.youtube.com/playlist?list=PLBML8SXyfQ6f0HYiKTs3riLBTaQfO-sGz',
                           u'output_path': u'C:/tmp/toot',
                           u'make_folder': u'false',
                           u'new_folder_name': u'toot',
                           u'is_playlist': u'false'}
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Downloaded Files successfully\"}")

    def test_submit(self):
        client = APIClient()
        # sub = YoutubeDLWorker("https://www.youtube.com/channel/UCs8nP5mUR3pwJmgixsul8Hw", {"folder_path": "C:/tmp/toot","subscription_name": "doge","provider": "youtube"})
        # sub = sub.create_subscription()
        # YoutubeDLWorker.download_subscription_in_directory(sub)
        p = client.get('http://127.0.0.1/liquid-dl/download-manager/subscriptions/create',
                       {
                           u'url': u'https://www.youtube.com/channel/UCs8nP5mUR3pwJmgixsul8Hw',
                           u'folder_path': u'C:/tmp/toot',
                           u'provider': u'youtube',
                           u"subscription_name": u"doge"
                       }, format='json')
