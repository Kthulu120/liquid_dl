# Liquid-dl

Liquid-dl is a simple tool for utlities such as FFMPEG, youtube-dl, and scdl. It provides a simple framework with simple point and click options allowing users
to just click on what they need and use the bare minimum commands to get the results needed.

![gif of Demo](https://media.giphy.com/media/xT9IghSXnGESMJj1WU/giphy.gif)

## Motivation And Notes

Built for users who need simple datahoarding methods whether it be from mobile or prefer a nice gui over command-line. Note that the root or '/' will never be accepted as an input path, so make sure to mount hard drives to some mount points.

### Prerequisites

First to use this web-gui you need the technologies(though most are simply supported by python pip) it uses installed so we'll go one-by-one for each program needed:

* Install ffmpeg & wget (though both should be installed by default on most linux distos). Though if ffmpeg isn't working [here's](https://askubuntu.com/questions/691109/how-do-i-install-ffmpeg-and-codecs) a quick stackoverflow that may help
```
sudo apt-get install ffmpeg
```
```
sudo apt-get install wget
```

* Install our Soundlcoud-dl
```
pip install scdl
```

* Install youtube-dl (if you have it downloaded already still run this command often as youtube-dl is constantly updated)
```
sudo pip install --upgrade youtube_dl
```

* Installing Dependencies
  *  You have two options download the dependencies on your global pip or launch the manage.py command to be in the virtualenv I have set up (you still must execute a 'sudo python pip install -r requirements.txt.' even in the virtualenv for some reason)
  * If you take the global dependency route then pip install from the requirements.txt file and you should be good to go
  * Finally if troubleshooting fails open an issue
## Installation

To install first download or git clone this directory (will be the most stable and frequently updated for bug fixes)
```
No real code here just download the latest release and unzip it fam
```
 Finally we need to cd inside the directory && run the server (though you may have to modify this command dependng on OS)
```
sudo nohup python manage.py runserver your-ip:8000
```
Though you can change the port aka the '8000' to any needed port (try to keep the number high)
#### The server should now be running and connectable by LAN at the selected port
## Bugfixes and Features

Feel free to **do pull requests**, open issues with **features you want** and the many bugs that may arise.

#### I forgot to comment out {% render_bundle %} in the latest release in templates/home.html file and uncomment out the script for the 'newest_prod_build' therefore your going to have to do it yourself if you download this before version 1.0.3 is released(which will be released around 9PM CST).

## Docker

Replace `<local_directory_for_downloads>` with the directory on your local machine. In the UI, use /downloads as the download directory.

`docker run -v <local_directory_for_downloads>:/downloads  -p 8000:8000 kthulu120/liquid_dl`

## Unraid

Add `https://github.com/lordchewie/liquid-dl-unraid` to `Template Repositories` at the bottom of the Docker page. Then Add image and select the liquid-dl template from the dropdown.

## Help

* This is a hackey way of running the server without gunicorn soon the scripts will be included to run a simple bash script that does the leg work for you
* Youtube-dl runs the --ignore-errors flag on the back-end so if a video is unavailable then it will simply skip it, also try to upgrade youtube-dl regularly as it may break due to constant need upkeep
* If your getting an error make sure that your using the entire path to teh file or folder (if its a folder you should have a backslash at the end)
* soundcloud-dl does not create folders for artists currently though in the upcoming commits liquid-dl will place all new downloaded songs into a folder witth that artists name
* Not optimized for mobile currently but does work
* Finally just open a issue anytime I'll try and get back to you in a day or two

## Updating

Cool thing about this is you can just download the latest release and overwrite the existing release since there's no persistence for this application

## Contributors

If you want to contribute please do a pull request with some documentation so others can know why something is implemented a certain way.

## License

MIT License do what you want
