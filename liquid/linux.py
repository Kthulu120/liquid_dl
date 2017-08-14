import os


def execute_commands():
    sudoPassword = 'mypass'
    command = 'mount -t vboxsf myfolder /home/myuser/myfolder'
    p = os.system('echo %s|sudo -S %s' % (sudoPassword, command))


def clean_history():
    command = r'history -c'
    p = os.system('echo %s' % (command))


def batch_convert(folder_path, input_format, output_fomat, convert=False):
    try:
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


def clean_old_files(folder_path, input_format, delete=False):
    try:
        if delete:
            command = r"cd {0} && shopt -s globstar && rm -r -- *.{1}".format(
                folder_path,
                input_format,
            )

    except Exception as e:
        return {'error': e}
