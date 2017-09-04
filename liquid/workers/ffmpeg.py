import os


class LinuxFfmpegConversionWorker(object):
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
        p = 0
        try:
            assert input_format is str
            if convert:
                command = r"cd {0} && for file in *.{1}; do ffmpeg -i \"$file\" \"${{file%.{1}}}\".{2}; done".format(
                    folder_path,
                    input_format,
                    output_fomat)

                process_result = os.system(command)
                if process_result is not 0:
                    raise OSError(
                        'Could Not convert files in' + folder_path + ' reselect your options and try again')
        except IOError as e:
            if e.errno is 13:
                raise OSError('Permission was denied, check your settings and make sure they are permissive')
        except Exception as e:
            return {'error': e}
        return p

    @staticmethod
    def clean_old_files(folder_path, input_format, delete=False):
        p = 0
        try:
            if delete:
                command = r"cd {0} && shopt -s globstar && rm -r -- *.{1}".format(
                    folder_path,
                    input_format,
                )
                process_result = os.system(command)
                if process_result is not 0:
                    raise OSError(
                        'Could Not clean old files in ' + folder_path + ' with extension ' + input_format)
        except Exception as e:
            return {'error': e}

    @staticmethod
    def convert_single_file(folder_path, input_format, output_fomat, convert=False):
        process_result = 0
        try:
            if convert:
                command = r"cd {0} && ffmpeg -i \"$file\" \"${{file%.{1}}}\".{2}; done".format(
                    folder_path,
                    input_format,
                    output_fomat)
                process_result = os.system(command)
            if process_result is not 0:
                raise OSError('Could Not convert file ' + folder_path + ' try reselecting your options and try again')
        except Exception as e:
            raise Exception(e)


class WindowsFfmpegConversionWorker(object):
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
        p = 0
        try:
            if convert:
                for filename in os.listdir(folder_path):
                    if filename.endswith("." + input_format):
                        command = r"cd {0} && ffmpeg -i {1} ".format(
                            folder_path, filename) + "\"{1}.{0}\"".format(
                            output_fomat, os.path.splitext(filename)[0])
                        process_result = os.system(command)
                        if process_result is not 0:
                            raise OSError(
                                'Could Not convert files in' + folder_path + ' reselect your options and try again')
        except IOError as e:
            if e.errno is 13:
                raise OSError('Permission was denied, check your settings and make sure they are permissive')
        except Exception as e:
            return {'error': e}
        return p

    @staticmethod
    def clean_old_files(folder_path, input_format, delete=False):
        p = 0
        try:
            if delete:
                command = r"cd {0} && del /S *.{1}".format(
                    folder_path,
                    input_format,
                )
                process_result = os.system(command)
                if process_result is not 0:
                    raise OSError(
                        'Could Not clean old files in ' + folder_path + ' with extension ' + input_format)
        except Exception as e:
            return {'error': e}

    @staticmethod
    def convert_single_file(folder_path, input_format, output_fomat, convert=False):
        process_result = 0
        try:
            if convert:
                file_name = folder_path.split('\\')
                # file_name = file_name[len(file_name) - 1]
                base = os.path.basename(folder_path)
                del file_name[-1]
                folder_path = "/".join(file_name)
                command = r"cd {0} && ffmpeg -i {1} ".format(
                    folder_path, base) + "\"{1}.{0}\"".format(
                    output_fomat, os.path.splitext(base)[0])
                process_result = os.system(command)
            if process_result is not 0:
                raise OSError('Could Not convert file ' + folder_path + ' try reselecting your options and try again')
        except Exception as e:
            raise Exception(e)
