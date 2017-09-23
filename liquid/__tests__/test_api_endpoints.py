import os
import shutil
import tempfile

import requests
from django.http import JsonResponse
from django.test import TestCase
from rest_framework.test import APIClient


class APIAccessorEndpointTest(TestCase):
    def setUp(self):
        """
        Simple pass since we're merely accessing data 
        """
        pass

    def tearDown(self):
        """
        Remove the directory after the test after 10 seconds so you can visually observe change
        :return: 
        """
        import time
        # Uncomment to observe changes in file viewer
        time.sleep(5)

    def test_get_subscriptions(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/download-manager/subscriptions/list',
                       {
                           u'url': u'https://www.youtube.com/playlist?list=PLBML8SXyfQ6f0HYiKTs3riLBTaQfO-sGz',
                           u'output_path': u'C:/tmp/toot',
                           u'make_folder': u'false',
                           u'new_folder_name': u'toot',
                           u'is_playlist': u'false'}
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
        TestCase.assertContains(self, response=p, text="{\"success\": \"Downloaded Files successfully\"}")

    def add_subscription(self):
        client = APIClient()
        p = client.get('http://127.0.0.1/download-manager/subscriptions/list',
                       {
                           u'url': u'https://www.youtube.com/playlist?list=PLBML8SXyfQ6f0HYiKTs3riLBTaQfO-sGz',
                           u'output_path': u'C:/tmp/toot',
                           u'make_folder': u'false',
                           u'new_folder_name': u'toot',
                           u'is_playlist': u'false'}
                       , format='json')
        self.assertIsInstance(p, JsonResponse)
