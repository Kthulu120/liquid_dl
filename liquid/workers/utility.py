import os


def update_requirement_dependencies():
    os.system("pip youtube-dl -U && pip scdl -U")
    return
