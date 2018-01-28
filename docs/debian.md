 ## Download Node and NPM
 wget https://nodejs.org/dist/v9.2.0/node-v9.2.0-linux-armv7l.tar.gz
 tar -xvf node-v9.2.0-linux-armv7l.tar.gz
 sudo mv node-v9.2.0-linux-armv7l/* /opt/node/
 cd /opt/node/bin/

 ## Place shortcuts in PATH
 sudo ln -s /opt/node/bin/node /usr/local/bin/node
 node -v
 sudo ln -s /opt/node/bin/npm /usr/local/bin/npm
 npm -v

 ## Add Debian8 repository
 sudo sh -c 'echo "deb http://ftp.uk.debian.org/debian/ jessie main non-free contrib" >> /etc/apt/sources.list'
 sudo apt-get update
 apt-cache search gcc
 apt-cache search g++
 sudo apt-get install gcc-4.8 g++-4.8

 ## Add new versions to PATH
 sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 50
 gcc --version
 sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 50
 g++ --version

 ## Install latest version of avconv tools from deb8
 sudo apt-get install libav-tools

 ## Finally build and configure liquid-dl
 npm install
 sudo ./node_modules/.bin/webpack --config webpack.config.js -p

 ## Flush and start
 sudo python3 manage.py flush
 sudo nohup python3 manage.py runserver 0.0.0.0:8080