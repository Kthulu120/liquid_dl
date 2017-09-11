from logging import Logger

import time
import youtube_dl

our_url = u"https://www.youtube.com/watch?v=d50WyI0JSH4"


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

    def my_hook(self, d):
        print(self.video_id)
        print(d)
        # print(a)
        if d['status'] == 'downloading':
            print (d)


d = MyLogger('fbsjkdfbsdkjfb')
ydl_opts = {
    'format': 'bestaudio/bestvideo',
    'postprocessors': [{
        'key': 'FFmpegExtractAudio',
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
    'logger': MyLogger(),
    'progress_hooks': [d.my_hook],
}
with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(["https://www.youtube.com/watch?v=rBpaUICxEhk"])
