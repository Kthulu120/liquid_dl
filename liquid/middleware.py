from django.http import JsonResponse
from django.shortcuts import HttpResponseRedirect
from django.urls import reverse
from liquid_dl import settings


class AuthRequiredMiddleware(object):
    """
    Forces non-authenticated users to only be able to access the login page 
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if request.user.is_authenticated or request.GET.get('apiKey') == settings.API_KEY:
            # Build Response inside so that we don't start a download
            response = self.get_response(request)
            return response
        if request.path == "/liquid-dl/login" and not request.is_ajax():
            response = self.get_response(request)
            return response
        # Let user know they are sending an invalid api key for the application
        if request.GET.get('apiKey') is not None:
            return JsonResponse({"error": "Incorrect API Key"})
        # Code to be executed for each request/response after
        # the view is called.

        return HttpResponseRedirect(reverse('login'))
