import os


class FFMPEG_CONVERTER(object):
    """
    A  batch converter that relies on a boolean as the final argument to determine if we should run the method.
    """
    @staticmethod
    def execute_commands():
        sudoPassword = 'mypass'
        command = 'mount -t vboxsf myfolder /home/myuser/myfolder'
        p = os.system('echo %s|sudo -S %s' % (sudoPassword, command))

    @staticmethod
    def clean_history():
        command = r'history -c'
        p = os.system('echo %s' % (command))

    @staticmethod
    def batch_convert(folder_path, input_format, output_fomat, convert=False):
        """
        Converts entire folder of files with a given file extension to another format
        :param folder_path: the 
        :type input_format: str
        :param input_format: 
        :type output_fomat: str
        :param output_fomat: the file extensions 9
        :param convert: control boolean to determine whether the method should run
        :return: 
        """
        try:
            assert input_format is str
            if convert:
                command = r"cd {0} && for file in *.{1}; do ffmpeg -i \"$file\" \"${{file%.{1}}}\".{2}; done".format(
                    folder_path,
                    input_format,
                    output_fomat)
                print (command)
                p = os.system(command)
                return True
        except Exception as e:
            return {'error': e}

    @staticmethod
    def clean_old_files(folder_path, input_format, delete=False):
        try:
            if delete:
                command = r"cd {0} && shopt -s globstar && rm -r -- *.{1}".format(
                    folder_path,
                    input_format,
                )
                p = os.system(command)
                return p

        except Exception as e:
            return {'error': e}
    @staticmethod
    def convert_single_file(folder_path, input_format, output_fomat, convert=False):
        command = r"cd {0} && ffmpeg -i \"$file\" \"${{file%.{1}}}\".{2}; done".format(
            folder_path,
            input_format,
            output_fomat)
