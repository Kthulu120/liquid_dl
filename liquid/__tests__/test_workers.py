import os
import shutil
import tempfile
import time
from django.test import TestCase
from liquid.workers.wget import WgetDLWorker
from liquid.workers.youtube_dl_worker import YoutubeDLWorker


class WgetWorkerTest(TestCase):
    def setUp(self):
        """
        Creates a temporary directory that works on Windows and Linux then proceeds to load in a jpg image that we can manipulate the two images our converter asserting out different responses
        """
        self.test_dir = tempfile.mkdtemp(dir='/tmp')
        # os.chdir(self.test_dir)
        self.link = "https://www.google.com/"

    def tearDown(self):
        """
        Remove the directory after the test after 10 seconds so you can visually observe change
        :return: 
        """

        # Uncomment to observe changes in file viewer
        time.sleep(5)
        os.chdir('/')
        shutil.rmtree(self.test_dir)

    def test_wget_basic_download(self):
        wget_dl = WgetDLWorker(url=self.link, output_path=self.test_dir, depth_level=0, recursive=False, no_parent=True,
                               no_clobber=True, robots=False, mirror=False, check_certificate=False, accept=[],
                               reject=[], accept_values=[], reject_values=[])
        wget_dl.make_command()

    def test_wget_basic__with_accept_params(self):
        wget_dl = WgetDLWorker(url=self.link, output_path=self.test_dir, depth_level=0, recursive=False, no_parent=True,
                               no_clobber=True, robots=False, mirror=False, check_certificate=False,
                               accept=["html", "gif"],
                               reject=[], accept_values=[], reject_values=[])
        wget_dl.make_command()


class YoutubeDLGetFormatsTest(TestCase):
    def setUp(self):
        """
        Creates a temporary directory that works on Windows and Linux then proceeds to load in a jpg image that we can manipulate the two images our converter asserting out different responses
        """
        self.test_dir = tempfile.mkdtemp(dir='/tmp')
        os.chdir(self.test_dir)
        self.link = "https://www.youtube.com/watch?v=A2_pboioWf0"
        self.failed_link = "https://www.whomsttube.com/watch?v=A2_pboioWf0"
        self.playlist_link = "https://www.youtube.com/playlist?list=PLBML8SXyfQ6f0HYiKTs3riLBTaQfO-sGz"

    def tearDown(self):
        """
        Remove the directory after the test after 10 seconds so you can visually observe change
        :return: 
        """

        # Uncomment to observe changes in file viewer
        time.sleep(3)
        os.chdir('/')
        shutil.rmtree(self.test_dir)

    def test_basic_check(self):
        downloader = YoutubeDLWorker.get_formats(self=None, url=self.playlist_link, folder_path=self.test_dir)
        assert isinstance(downloader, dict)

    def test_fake_link_get_formats(self):
        try:
            m = []
            popp = os.subprocess.check_output(['cmd', '/c',
                                               'cd C:/tmp/toot && youtube-dl -F https://www.youtube.com/watch?v=A2_pboioWf0 --write-info-json  --simulate '])
            popp = (list(popp.split('\n')))
            del popp[0:6]
            for x in popp:
                yum = (' '.join(x.split()))
                m.append(yum)

            print (m)
        except Exception as e:
            print(e)
            # print(downloader.list_formats('https://www.youtube.com/watch?v=A2_pboioWf0'))
            # assert isinstance(downloader, dict)
            # assert 'error' in downloader
