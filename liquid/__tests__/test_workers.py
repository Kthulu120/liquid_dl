import json
from django.http import JsonResponse
from django.test import TestCase, SimpleTestCase
import os
import shutil, tempfile
import requests
import shutil, tempfile
from os import path
from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient
import time

from liquid.workers.wget import WgetDLWorker


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
                               reject=[])
        wget_dl.make_command()

    def test_wget_basic__with_accept_params(self):
        wget_dl = WgetDLWorker(url=self.link, output_path=self.test_dir, depth_level=0, recursive=False, no_parent=True,
                               no_clobber=True, robots=False, mirror=False, check_certificate=False,
                               accept=["html", "gif"],
                               reject=[])
        wget_dl.make_command()
