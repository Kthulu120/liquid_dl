from django.shortcuts import HttpResponseRedirect
from django.urls import reverse


class AuthRequiredMiddleware(object):
    """
    Forces non-authenticated users to only be able to access the login page 
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)
        if not request.user.is_authenticated() and request.path != "/liquid-dl/login":
            return HttpResponseRedirect(reverse('login'))

        # Code to be executed for each request/response after
        # the view is called.

        return response
