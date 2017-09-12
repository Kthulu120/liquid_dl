import logging
import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'liquid_dl.settings')
import django
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
        if info['status'] == 'downloading':
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
        print(link)
        logger.info('Queueing {0}'.format(link))
        queue.put((download_dir, link, info_dict))
    # Causes the main thread to wait for the queue to finish processing all the tasks
    queue.join()
    # print('Took {}'.format(time() - ts))
