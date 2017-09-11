import json
import logging
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'liquid_dl.settings')
import django

django.setup()
from requests import request
from time import time
from queue import Queue
from threading import Thread
import multiprocessing
import youtube_dl
from liquid.models import Video
import _strptime

logger = logging.getLogger(__name__)


class MyLogger(object):
    def __init__(self, video_id=None):
        self.video_id = video_id

    def debug(self, msg):
        pass

    def warning(self, msg):
        pass

    def error(self, msg):
        print()

    def progress(self, msg):
        print("HMMMMM")

    def my_hook(self, info):
        if info['status'] == 'downloading':
            print (self.video_id)
            video, created = Video.objects.update_or_create(id=self.video_id,
                                                            defaults={"download_status": info['status'],
                                                                      "download_speed": info['_speed_str'],
                                                                      "download_percentage": info['_percent_str'],
                                                                      "total_size": info['_total_bytes_str'],
                                                                      "eta": info['_eta_str'],
                                                                      "filename": info['filename']})


class DownloadWorker(Thread):
    def __init__(self, queue):
        Thread.__init__(self)
        self.queue = queue

    def run(self):
        directory, link, info_dict = self.queue.get()
        print(link)
        assert isinstance(info_dict, dict)
        worker_logger = MyLogger(video_id=link.get('url'), )
        ydl_opts = {
            'format': link.get('chosen_format'),
            'logger': MyLogger(),
            'progress_hooks': [worker_logger.my_hook],
        }
        video, created = Video.objects.get_or_create(id=link['url'])
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            while True:
                # Get the work from the queue and expand the tuple
                ydl.download([link.get('url')])
                self.queue.task_done()


def youtube_dl_multiprocessor(download_dir, make_dir, info_dict, links=None):
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
    queue = Queue()
    # Create 8 worker threads
    for x in range(multiprocessing.cpu_count()):
        worker = DownloadWorker(queue)
        # Setting daemon to True will let the main thread exit even though the workers are blocking
        worker.daemon = True
        worker.start()
    # Put the tasks into the queue as a tuple
    for link in links:
        logger.info('Queueing {0}'.format(link))
        queue.put((download_dir, link, info_dict))
    # Causes the main thread to wait for the queue to finish processing all the tasks
    queue.join()
    print('Took {}'.format(time() - ts))


our_url = [{u'url': u"https://www.youtube.com/watch?v=d50WyI0JSH4",
            u'chosen_format': u'139'},
           {u'url': u"https://www.youtube.com/watch?v=1OSyfD1zOiY",
            u'chosen_format': u'139'}
           ]

d = {
    'chosen_format': '139'
}
some_path = "C:/tmp"
make = {
    'make_dir': True,
    'directory_name': 'fdfd'
}
# youtube_dl_multiprocessor(some_path, make, d, our_url)
