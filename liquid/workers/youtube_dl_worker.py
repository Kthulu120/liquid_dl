import json
import os
import platform
import shutil
import uuid
import tempfile



class YoutubeDLWorker(object):
    def __init__(self, url, params):
        self.url = url

    @staticmethod
    def get_formats(self, url, folder_path, make_folder=False, new_folder_name=None):
        """
        Grabs the file formats for videos
        :param self: 
        :param url: 
        :param folder_path: 
        :param make_folder: 
        :param new_folder_name:
        :return: 
        """
        test_dir = tempfile.mkdtemp(dir='/tmp')
        # folder_path = self.test_dir
        os.chdir(test_dir)
        command = "youtube-dl {1} --write-info-json --skip-download".format(folder_path, url)
        json_files = []
        try:
            os.system(command)
        except Exception as e:
            # TODO: Print StackTrace
            print(e)
            return {'error': e}
        all_formats_for_videos = {'formats': []}
        for filename in os.listdir(test_dir):
            if filename.endswith(".info.json"):
                # print(os.path.join(directory, filename))
                with open(filename) as data_file:
                    data = (json.load(data_file))
                    video = {'video_name': data.get('title', "Could not Find Name"), 'formats': []}
                    # TODO: Optimize this
                    for this_format in data['formats']:
                        video.get('formats').append({
                            'format': this_format.get('format', "Error"),
                            'format_note': this_format.get('format_note', "Error"),
                            'extension': this_format.get('ext', "Error"),
                            'id': data.get('webpage_url')
                        })
                all_formats_for_videos.get('formats').append(video)
            else:
                continue
        os.chdir('/')
        shutil.rmtree(test_dir)
        return all_formats_for_videos
