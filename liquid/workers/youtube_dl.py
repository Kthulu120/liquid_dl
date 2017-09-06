import json
import os
import platform
import uuid


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
        if make_folder:
            folder_path += '/' + new_folder_name
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
        command = "cd {0} && youtube-dl {1} --write-info-json --skip-download".format(folder_path, url)
        json_files = []
        try:
            os.system(command)
        except Exception as e:
            # TODO: Print StackTrace
            print(e)
            return {'error': e}
        all_formats_for_videos = {'formats': []}
        os.chdir(folder_path)
        for filename in os.listdir(folder_path):
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
                            'id': data.get('id')
                        })
                all_formats_for_videos.get('formats').append(video)
            else:
                continue
        return all_formats_for_videos
