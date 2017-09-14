import logging
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'liquid_dl.settings')
import django
from liquid.models import YoutubedlVideo
django.setup()
from time import time
from queue import Queue
from threading import Thread
import multiprocessing
import youtube_dl

logger = logging.getLogger(__name__)


class MultiProcessorLogger(object):
    def __init__(self, video_id=None):
        self.video_id = video_id

    def debug(self, msg):
        print(msg)

    def warning(self, msg):
        pass

    def error(self, msg):
        print()

    def progress(self, msg):
        print("HMMMMM")

    def my_hook(self, info):
        assert isinstance(info, dict)
        if info['status'] == 'downloading':
            print(info)
            v, s = YoutubedlVideo.objects.update_or_create(url=self.video_id, defaults={
                "filename": info.get("filename"),
                "download_status": info.get("status", "N/A"),
                "download_speed": info.get("_speed_str", "N/A"),
                "download_percentage": info.get("_percent_str", "N/A"),
                "total_size": info.get("_total_bytes_str", "N/A"),
                "eta": info.get("_eta_str", "N/A")
            })
        if info['status'] == 'finished':
            v, s = YoutubedlVideo.objects.update_or_create(url=self.video_id, defaults={
                "filename": info.get("filename"),
                "download_status": info.get("status", "finished"),
            })

            pass


class DownloadWorker(Thread):
    def __init__(self, queue):
        Thread.__init__(self)
        self.queue = queue

    def run(self):
        directory, link, info_dict = self.queue.get()
        print(link)
        assert isinstance(info_dict, dict)
        worker_logger = MultiProcessorLogger(video_id=link.get('id'), )
        ydl_opts = {
            'format': link.get('chosen_format'),
            'logger': MultiProcessorLogger(),
            'progress_hooks': [worker_logger.my_hook],
        }
        with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            ydl.download([link.get('id')])
            self.queue.task_done()


def youtube_dl_multiprocessor(download_dir, make_dir, info_dict, links=None):
    """
    Sets up multiple threads to download youtube videos in case of rate limiting or other factors that would limit the main thread
    
    :param download_dir: the main folder where files will be downloaded or the parent folder of the directory we are going to create
    :param make_dir: determines if we must create a new directory
    :param info_dict: dictionary of values that determines
    :param links: list of objects with id (for url) and and chosen_formt
    :return:
    """
    if make_dir.get('make_dir'):
        if not os.path.exists(download_dir + '/' + make_dir.get('directory_name')):
            os.chdir(download_dir)
            os.mkdir(make_dir.get('directory_name'))
            download_dir = download_dir + '/' + make_dir.get('directory_name')
        else:
            os.chdir(download_dir + '/' + make_dir.get('directory_name'))
    os.chdir(download_dir)
    if links is None:
        links = []
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
        v, s = YoutubedlVideo.objects.update_or_create(url=link['id'], defaults={
            "download_status": "queued"
        })
        all = YoutubedlVideo.objects.all()
        print(link)
        logger.info('Queueing {0}'.format(link))
        queue.put((download_dir, link, info_dict))
    # Causes the main thread to wait for the queue to finish processing all the tasks
    queue.join()
    # print('Took {}'.format(time() - ts))
