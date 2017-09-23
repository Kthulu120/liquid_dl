import json
import os
import platform
import shutil
import uuid
import tempfile
import os

import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'liquid_dl.settings')
import django

django.setup()
import youtube_dl
from liquid_dl.settings import BASE_DIR
from liquid.models import VideoSubscription, YoutubedlVideo


# https://www.youtube.com/channel/UCs8nP5mUR3pwJmgixsul8Hw

class YoutubeDLWorker(object):
    def __init__(self, url, params):
        self.url = url
        self.params = params

    @staticmethod
    def get_formats(self, url, folder_path, make_folder=False, new_folder_name=None):
        """
        Grabs the file formats for videos
        :param self: 
        :param url: 
        :param folder_path: 
        :param make_folder: 
        :param new_folder_name:
        :return: 
        """
        test_dir = tempfile.mkdtemp(dir='/tmp')
        # folder_path = self.test_dir
        os.chdir(test_dir)
        command = "youtube-dl {1} --write-info-json --skip-download".format(folder_path, url)
        json_files = []
        try:
            os.system(command)
        except Exception as e:
            # TODO: Print StackTrace
            print(e)
            return {'error': e}
        all_formats_for_videos = {'formats': []}
        for filename in os.listdir(test_dir):
            if filename.endswith(".info.json"):
                # print(os.path.join(directory, filename))
                with open(filename) as data_file:
                    data = (json.load(data_file))
                    video = {'video_name': data.get('title', "Could not Find Name"), 'formats': []}
                    # TODO: Optimize this
                    for this_format in data['formats']:
                        video.get('formats').append({
                            'format': this_format.get('format', "Error"),
                            'format_note': this_format.get('format_note', "Error"),
                            'extension': this_format.get('ext', "Error"),
                            'id': data.get('webpage_url')
                        })
                all_formats_for_videos.get('formats').append(video)
            else:
                continue
        os.chdir(BASE_DIR)
        shutil.rmtree(test_dir)
        return all_formats_for_videos

    def create_subscription(self):
        subscription, created = VideoSubscription.objects.update_or_create(url=self.url, defaults={
            "folder_path": self.params.get("folder_path"),
            "subscription_name": self.params.get("subscription_name", self.params.get("filename", "N/A")),
            "provider": self.params.get("provider", "youtube"),
            "format": self.params.get("format", "best/bestvideo/bestaudio"),
            "output_template": self.params.get("output_template", "%(title)s-%(id)s.%(ext)s'")
        })
        return subscription

    @staticmethod
    def validate_videos_in_subscription(subscription):
        """
        :type subscription VideoSubscription
        :param subscription: 
        :return: 
        """

        test_dir = tempfile.mkdtemp(dir='/tmp')
        # folder_path = self.test_dir
        os.chdir(test_dir)
        command = "youtube-dl citw {0} --write-info-json --skip-download".format(subscription.url)
        try:
            os.system(command)
        except Exception as e:
            # TODO: Print StackTrace
            print(e)
            return {'error': e}
        for filename in os.listdir(test_dir):
            if filename.endswith(".info.json"):
                with open(filename) as data_file:
                    data = (json.load(data_file))
                    video, created = YoutubedlVideo.objects.get_or_create(url=data.get('webpage_url'),
                                                                          defaults={
                                                                              "folder_path": subscription.folder_path,
                                                                              "subscription": subscription
                                                                          })
                    if created:
                        video.download_status = "added"
                        video.save()
            else:
                continue
        os.chdir(BASE_DIR)
        print(test_dir)
        shutil.rmtree(test_dir)

    @staticmethod
    def download_subscription_in_directory(subscription):
        logger = SubscriptionLogger(subscription)
        ydl_opts = {
            "ignoreerrors": True,
            "nooverwrites": True,
            'format': subscription.format,
            'logger': logger,
            'progress_hooks': [logger.my_hook],
        }
        os.chdir(subscription.folder_path)
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([subscription.url])
        os.chdir(BASE_DIR)
        return


class SubscriptionLogger(object):
    def __init__(self, subscription):
        self.subscription = subscription
        pass

    def debug(self, msg):
        print(msg)
        if (re.match(r'\[download] Downloading video ', msg)):
            try:
                found = re.findall(r'\d+', msg)
                self.subscription.number_downloaded, self.subscription.total_number_files = (
                int(found[0]), int(found[1]))
                self.subscription.save()
            except AttributeError:
                # AAA, ZZZ not found in the original string
                found = 'ERROR: Subscription Logger debug'  # apply your error handling
                print (found)

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)

    def progress(self, msg):
        pass

    @staticmethod
    def my_hook(info):
        assert isinstance(info, dict)
        if info['status'] == 'downloading':
            # print(info)
            v, s = YoutubedlVideo.objects.update_or_create(filename=info["filename"], defaults={
                "filename": info.get("filename"),
                "download_status": info.get("status", "N/A"),
                "download_speed": info.get("_speed_str", "N/A"),
                "download_percentage": info.get("_percent_str", "N/A"),
                "total_size": info.get("_total_bytes_str", "N/A"),
                "eta": info.get("_eta_str", "N/A")
            })
        if info['status'] == 'finished':
            v, s = YoutubedlVideo.objects.update_or_create(filename=info["filename"], defaults={
                "filename": info.get("filename"),
                "download_status": info.get("status", "finished"),
            })
            pass

# sub = YoutubeDLWorker("https://www.youtube.com/channel/UCs8nP5mUR3pwJmgixsul8Hw", {"folder_path": "C:/tmp/toot",
#                                                                                   "subscription_name": "doge",
#                                                                                   "provider": "youtube"})
# sub = sub.create_subscription()
# YoutubeDLWorker.download_subscription_in_directory(sub)
