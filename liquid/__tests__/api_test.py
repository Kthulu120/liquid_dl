from django.http import JsonResponse
from django.test import TestCase, SimpleTestCase
import os
import shutil, tempfile
import requests
import shutil, tempfile
from os import path
from rest_framework.test import APIRequestFactory
from rest_framework.test import APIClient


class FFmpegConversion(TestCase):
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
        import time
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
