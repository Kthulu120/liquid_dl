const routes = require("./app/routes");
const express = require('express');
const bodyParser = require('body-parser');
var fs = require("fs");
const app = express();
const methods = require("./app/webtorrent_mehods");
const port = 8111;

var WebTorrent = require('webtorrent');
var client = new WebTorrent();
var magnetURI = 'magnet:?xt=urn:btih:19f52af36c1e5d42ef8aa5628934479b65b06f5c&dn=101+Ready-to-Use+Excel+Formulas+-+Michael+Alexander%2C+Dick+Kuslei&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Fzer0day.ch%3A1337&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';

//console.log(path.basename(__dirname));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", (req, res) => {
    methods.addTorrent(client, magnetURI, "C:/tmp/toot/");
    res.send("home");
});
app.use('liquid-dl', routes);
app.listen(port, () => {
    console.log('We are live on ' + port);
});


