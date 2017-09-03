#!/usr/bin/env python
import argparse, os, sys, urllib, yaml
from imgurpython import ImgurClient
from imgurpython.helpers.error import ImgurClientError

def parse_args():
    parser = argparse.ArgumentParser(description='Download an Imgur album/gallery into a folder.')
    parser.add_argument('-c', '--config', type=argparse.FileType('r'), default=os.path.expanduser('~/.config/imgur_downloader/config.yaml'),
            help='config file to load settings from')
    parser.add_argument('-a', '--album', help='album ID to download from Imgur (can be specified multiple times)', required=True, action='append')
    parser.add_argument('-d', '--directory', default=os.path.dirname(os.path.realpath(__file__)), help='directory to save images into')

    return parser.parse_args()

def load_config(config_file):
    print('Loading config file {}'.format(config_file.name))
    try:
        config = yaml.load(config_file)
    except yaml.YAMLError as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        print('Error loading YAML {} on line {}'.format(e, exc_tb.tb_lineno))

    return config

def download_image(image_url, download_path):
    """
    Download image and save it to file path
    """
    try:
        download = urllib.URLopener()
        download.retrieve(image_url, download_path)
        print("File {} downloaded to {}".format(image_url, download_path))

    except urllib.error.URLError as e:
        print("Error downloading image '{}': {}".format(image_url, e))
    except urllib.error.HTTPError as e:
        print("HTTP Error download image '{}': {!s}".format(image_url, e))

def main():
    global config
    global args

    args   = parse_args()
    config = load_config(args.config)

    # Initialise Imgur client
    client = ImgurClient(config['imgur_client_id'], config['imgur_client_secret'])

    for album in args.album:
        # Get our album images
        try:
            images = client.get_album_images(album)
        except ImgurClientError as e:
            print('ERROR: {}'.format(e.error_message))
            print('Status code {}'.format(e.status_code))

        print("Downloading album {} ({!s} images)".format(album, len(images)))

        # Download each image
        for image in images:
            # Turn our link HTTPs
            link      = image.link.replace("http://","https://")
            # Get our file name that we'll save to disk
            file_name = link.replace("https://i.imgur.com/","")
            download_path = os.path.join(args.directory, file_name)
            if os.path.isfile(download_path):
                print("File exists for image {}, skipping...".format(file_name))
            else:
                download_image(link, download_path)

if __name__ == '__main__':
    main()