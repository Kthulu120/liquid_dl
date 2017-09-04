import os


class WgetDLWorker(object):
    def __init__(self, url, output_path, depth_level, recursive, no_parent, no_clobber, robots, mirror, accept, reject,
                 check_certificate):

        self.url = url
        self.output_path = output_path
        self.depth_level = depth_level
        self.recursive = recursive
        self.no_parent = no_parent
        self.no_clobber = no_clobber
        self.robots = robots
        self.mirror = mirror
        self.accept = accept
        self.reject = reject
        self.check_certificate = check_certificate

    def make_command(self):
        command = "cd {0} && wget {1} --level={2} ".format(self.output_path, self.url, self.depth_level)
        if self.robots:
            command += "-e robots=off "
        if self.recursive:
            command += "-r "
        if self.no_parent:
            command += "-np "
        if self.no_clobber:
            command += "-nc "
        if self.mirror:
            command += "-m "
        if not self.check_certificate:
            command += "--no-check-certificate "
        if self.accept:
            command += "--accept="
            for file_type in self.accept:
                command += str(file_type) + ","
            command += " "
        if self.reject:
            command += "--reject="
            for file_type in self.reject:
                command += str(file_type) + ","
            command += " "
        try:
            process_result = os.system(command)
            if process_result is not 0:
                raise OSError("Could not download files")
        except Exception as e:
            return {'error': e}
