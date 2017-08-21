# Liquid-dl

Liquid-dl is a simple tool for utlities such as FFMPEG, youtube-dl, and scdl. It provides a simple framework with simple point and click options allowing users
to just click on what they need and use the bare minimum commands to get the results needed.

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
* Imgur-dl will be included natively in the next commit or two until then it is unsupported
* Install youtube-dl (if you have it downloaded already still run this command often as youtube-dl is constantly updated)
```
sudo pip install --upgrade youtube_dl
```

## Installation

To install first download or git clone this directory (will be the most stable and frequently updated for bug fixes)
```
git clone https://github.com/Kthulu120/liquid_dl.git
```
 Finally we need to cd inside the directory && run the server
```
sudo nohup python manage.py runserver your-ip:8000
```
Though you can change the port aka the '8000' to any needed port (try to keep the number high)
#### The server should now be running and connectable by LAN at the selected port
## Bugfixes and Features

Feel free to **do pull requests**, open issues with **features you want** and the many bugs that may arise.

## Help

* This is a hackey way of running the server without gunicorn soon the scripts will be included to run a simple bash script that does the leg work for you
* Youtube-dl runs the --ignore-errors flag on the back-end so if a video is unavailable then it will simply skip it, also try to upgrade youtube-dl regularly as it may break due to constant need upkeep
* If your getting an error make sure that your using the entire path to teh file or folder (if its a folder you should have a backslash at the end)
* soundcloud-dl does not create folders for artists currently though in the upcoming commits liquid-dl will place all new downloaded songs into a folder witth that artists name
* Not optimized for mobile currently but does work
* Finally just open a issue anytime I'll try and get back to you in a day or two


## Contributors

If you want to contribute please do a pull request with some documentation so others can know why something is implemented a certain way.

## License

MIT License do what you want