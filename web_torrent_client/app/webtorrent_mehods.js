//const client = new WebTorrent();
const requestify = require('requestify');
const path = require("path");

let methods = {
    getRelativePathFromAbsolute: (someFilePath) => {
        return path.relative(process.cwd(), someFilePath);
    },
    addTorrent: (client, magnet, path) => {

        client.add(magnet, {path: methods.getRelativePathFromAbsolute(path)}, function (torrent) {
            console.log(torrent.infoHash);
            console.log(torrent.path);

            torrent.on('download', () => {
                requestify.get('http://127.0.0.1:8000/liquid-dl/torrents/torrent/update', {
                    params: {
                        infohash: torrent.infoHash,
                        folder_path: torrent.path,
                        numPeers: torrent.numPeers,
                        ratio: torrent.ratio,
                        time_left: torrent.timeRemaining,
                        progress: torrent.progress,
                        magnet_uri: torrent.magnetURI,
                        upload_speed: torrent.uploadSpeed,
                        download_speed: torrent.downloadSpeed,
                        amt_uploaded: torrent.uploaded,
                        amt_downloaded: torrent.downloaded,
                        torrent_name: torrent.name,

                    }
                }).then(function (response) {
                    // Get the response body
                    console.log(response.getBody());
                });
            });
            torrent.on('ready', () => {
                console.log('torrent download finished');
                //console.log(torrent);
            });
            torrent.on('seed', function () {
                console.log("DONE, SEEDING")
            })
        });
    }
};

module.exports = methods;