import logging
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'liquid_dl.settings')
import django

django.setup()
from time import time
import youtube_dl

logger = logging.getLogger(__name__)


class SingleThreadLogger(object):
    def __init__(self, video_id=None):
        self.video_id = video_id

    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print(msg)

    def progress(self, msg):
        pass

    def my_hook(self, info):
        if info['status'] == 'downloading':
            print (info)
        if info['status'] == 'finished':
            pass


def youtube_dl_single_thread(download_dir, make_dir, info_dict, links=None):
    """

    :param download_dir: 
    :param make_dir: 
    :param info_dict: 
    :param links: 
    :return: 
    """
    if make_dir.get('make_dir'):
        if not os.path.exists(download_dir + '/' + make_dir.get('directory_name')):
            os.chdir(download_dir)
            os.mkdir(make_dir.get('directory_name'))
            download_dir = download_dir + '/' + make_dir.get('directory_name')

    os.chdir(download_dir)
    if links is None:
        links = []
    ts = time()
    # Create a queue to communicate with the worker threads
    # Put the tasks into the queue as a tuple
    for link in links:
        worker_logger = SingleThreadLogger(video_id=link.get('id'))
        ydl_opts = {
            'format': link.get('chosen_format'),
            'logger': SingleThreadLogger(),
            'progress_hooks': [worker_logger.my_hook],
        }
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([link.get('id')])

# some_path = "C:/tmp/toot"
# make = {
#    "make_dir": False
# }
# d = {}
# our_url = [{"id":"https://www.youtube.com/watch?v=A2_pboioWf0", "chosen_format": "best"}]
# youtube_dl_single_thread(some_path, make, d, our_url)
